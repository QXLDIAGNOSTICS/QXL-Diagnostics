"""Tool (function-calling) definitions the chat assistant can invoke to ground
its answers in real backend data: catalog search, centers, bookings, and the
current user's analyzed prescriptions. Also supports fully automated,
in-chat booking: finding the nearest center and creating a booking directly.
"""
from __future__ import annotations

import json
import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.exceptions import AppError
from app.models.user import User
from app.services import booking_service, catalog_service, content_service, payment_service, prescription_service

TOOL_SPECS: list[dict] = [
    {
        "type": "function",
        "function": {
            "name": "search_health_packages",
            "description": (
                "Search QXL Diagnostics health check packages by keyword or condition "
                "(e.g. 'diabetes', 'full body', 'senior citizen', 'women'). Returns "
                "matching packages with price, savings, and what they include. Use an "
                "empty query to list the most popular packages."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "Keyword to search for, or empty string for all popular packages.",
                    }
                },
                "required": ["query"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "search_tests",
            "description": (
                "Search individual lab tests by name or keyword (e.g. 'CBC', 'thyroid', "
                "'vitamin d'). Returns price, preparation instructions, and turnaround time."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "Test name or keyword to search for."}
                },
                "required": ["query"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "list_centers",
            "description": (
                "List QXL Diagnostics collection centers/labs, optionally filtered by city. "
                "Returns address, phone, and operating hours."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "City to filter by, or empty string to list all centers.",
                    }
                },
                "required": ["city"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_my_bookings",
            "description": (
                "Get the current logged-in user's recent test/package bookings and their "
                "status (pending, confirmed, sample_collected, report_ready, completed). "
                "Only use this for the authenticated user asking about their OWN bookings."
            ),
            "parameters": {"type": "object", "properties": {}, "required": []},
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_my_prescriptions",
            "description": (
                "Get the current logged-in user's previously uploaded prescriptions and "
                "the AI-generated analysis (recommended tests, medications, diagnosis hints, "
                "summary). Use this when the user asks about their prescription, uploaded "
                "report, or what tests were recommended for them."
            ),
            "parameters": {"type": "object", "properties": {}, "required": []},
        },
    },
    {
        "type": "function",
        "function": {
            "name": "check_prescription_quota",
            "description": (
                "Check how many prescription uploads the current user has left this month "
                "(monthly upload limit). Use this before telling a user they can upload a "
                "prescription for AI-assisted booking, or when they ask about their upload limit."
            ),
            "parameters": {"type": "object", "properties": {}, "required": []},
        },
    },
    {
        "type": "function",
        "function": {
            "name": "find_nearest_centers",
            "description": (
                "Find QXL collection centers nearest to the user, sorted by distance. Uses "
                "the user's shared browser location automatically when available — do NOT "
                "invent latitude/longitude yourself. If no location is available and no city "
                "is given, this returns centers unsorted and you should ask the user for their "
                "city or to share their location."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "Optional city to filter/narrow results, e.g. 'Mumbai'.",
                    },
                    "limit": {
                        "type": "integer",
                        "description": "Max number of centers to return (default 5).",
                    },
                },
                "required": [],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "search_blog_posts",
            "description": (
                "Search QXL's published blog articles by keyword or topic (e.g. 'diabetes', "
                "'thyroid', 'preventive health'). Use this when the user asks for health "
                "education content, articles, or 'what does QXL say about X'."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "Keyword or topic to search blog posts for."}
                },
                "required": ["query"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "list_faqs",
            "description": (
                "List QXL's frequently asked questions, optionally filtered by category. "
                "Use this for general policy/process questions (report time, fasting rules, "
                "home collection process, payment, etc.) before saying you don't know."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "category": {"type": "string", "description": "Optional FAQ category, or empty for all."}
                },
                "required": [],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "create_booking",
            "description": (
                "Create a real test/package booking for the current user, directly from the "
                "chat conversation. Only call this after you have collected and confirmed ALL "
                "required patient details with the user (name, phone, and either a package name "
                "or test name), the collection type (home or center), and — for home collection "
                "— a full address, or — for center visit — a center (use find_nearest_centers "
                "first and confirm which one). Always read back a summary and get explicit "
                "confirmation from the user before calling this tool."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "patient_name": {"type": "string"},
                    "patient_phone": {"type": "string"},
                    "patient_email": {"type": "string", "description": "Optional."},
                    "patient_age": {"type": "integer", "description": "Optional."},
                    "patient_gender": {"type": "string", "description": "Optional."},
                    "package_name": {
                        "type": "string",
                        "description": "Name of the health package being booked, if any.",
                    },
                    "test_name": {
                        "type": "string",
                        "description": "Name of the individual test being booked, if any.",
                    },
                    "center_id": {
                        "type": "string",
                        "description": "UUID of the chosen center (from find_nearest_centers), if collection_type is 'center'.",
                    },
                    "collection_type": {
                        "type": "string",
                        "enum": ["home", "center"],
                        "description": "'home' for home sample collection, 'center' for visiting a center.",
                    },
                    "collection_address": {
                        "type": "string",
                        "description": "Full address, required when collection_type is 'home'.",
                    },
                    "preferred_date": {"type": "string", "description": "ISO date, e.g. 2025-04-01."},
                    "preferred_time": {"type": "string", "description": "Preferred time slot, e.g. '9:00 AM'."},
                    "notes": {"type": "string", "description": "Optional notes."},
                    "is_urgent": {"type": "boolean", "description": "Optional, default false."},
                },
                "required": ["patient_name", "patient_phone", "collection_type"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "create_payment_order",
            "description": (
                "Create ONE combined secure Razorpay payment order covering all of the "
                "booking_ids given, so the user pays a single total instead of paying "
                "separately for each test/package. Call this immediately after you have "
                "created ALL the bookings the user wants to pay for right now (call "
                "create_booking once per test/package first, collecting each returned "
                "booking_id, then call this ONCE with the full list). After calling this, "
                "tell the user a secure payment button has appeared in the chat for the "
                "combined total — never ask them to pay via any other method, and never "
                "claim payment is complete yourself; the system confirms that separately "
                "once they finish the Razorpay checkout."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "booking_ids": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "All booking IDs (from create_booking results) to pay for together.",
                    }
                },
                "required": ["booking_ids"],
            },
        },
    },
]


async def execute_tool(
    name: str,
    arguments: dict,
    *,
    db: AsyncSession,
    user: User,
    location: tuple[float, float] | None = None,
) -> str:
    """Dispatch a tool call by name and return a JSON string result.

    ``location`` is the user's browser-shared (lat, lng), threaded in from
    the chat request — never taken from the model's own arguments, so the
    assistant can't fabricate a location.
    """
    try:
        if name == "search_health_packages":
            query = (arguments.get("query") or "").strip()
            packages = await catalog_service.list_active_packages(db)
            if query:
                q = query.lower()
                packages = [
                    p for p in packages
                    if q in p.name.lower() or (p.includes and q in p.includes.lower()) or (p.tag and q in p.tag.lower())
                ]
            packages = packages[:8]
            return json.dumps(
                [
                    {
                        "name": p.name,
                        "price": p.price,
                        "old_price": p.old_price,
                        "parameters": p.parameters,
                        "includes": p.includes,
                        "doctor_recommended": p.doctor_recommended,
                    }
                    for p in packages
                ]
            )

        if name == "search_tests":
            query = (arguments.get("query") or "").strip()
            tests = await catalog_service.search_tests(db, query, limit=8) if query else await catalog_service.list_active_tests(db)
            tests = tests[:8]
            return json.dumps(
                [
                    {
                        "name": t.name,
                        "category": t.category,
                        "price": t.price,
                        "preparation": t.preparation,
                        "turnaround_hours": t.turnaround_hours,
                    }
                    for t in tests
                ]
            )

        if name == "list_centers":
            city = (arguments.get("city") or "").strip() or None
            centers = await catalog_service.list_active_centers(db, city=city)
            return json.dumps(
                [
                    {
                        "name": c.name,
                        "address": c.address,
                        "city": c.city,
                        "phone": c.phone,
                        "hours": c.hours,
                    }
                    for c in centers[:10]
                ]
            )

        if name == "get_my_bookings":
            bookings, _ = await booking_service.list_my_bookings(db, user, limit=5)
            return json.dumps(
                [
                    {
                        "test_name": b.test_name,
                        "status": b.status,
                        "preferred_date": b.preferred_date,
                        "collection_type": b.collection_type,
                    }
                    for b in bookings
                ]
            )

        if name == "get_my_prescriptions":
            summaries = await prescription_service.latest_completed_summaries(db, user.id, limit=3)
            if not summaries:
                return json.dumps({"message": "No analyzed prescriptions found for this user yet."})
            return json.dumps(summaries)

        if name == "search_blog_posts":
            query = (arguments.get("query") or "").strip()
            if not query:
                return json.dumps({"error": "Provide a keyword or topic to search blog posts for."})
            posts = await content_service.search_blog_posts(db, query, limit=5)
            return json.dumps(
                [
                    {
                        "title": p.title,
                        "excerpt": p.excerpt,
                        "category": p.category,
                        "slug": p.slug,
                    }
                    for p in posts
                ]
            )

        if name == "list_faqs":
            category = (arguments.get("category") or "").strip() or None
            faqs = await content_service.list_active_faqs(db, category=category)
            return json.dumps(
                [{"question": f.question, "answer": f.answer, "category": f.category} for f in faqs[:15]]
            )

        if name == "check_prescription_quota":
            quota = await prescription_service.get_upload_quota(db, user.id)
            return json.dumps(quota)

        if name == "find_nearest_centers":
            city = (arguments.get("city") or "").strip() or None
            limit = int(arguments.get("limit") or 5)
            if location is not None:
                lat, lng = location
                centers = await catalog_service.nearest_centers(db, lat=lat, lng=lng, city=city, limit=limit)
            else:
                centers = (await catalog_service.list_active_centers(db, city=city))[:limit]
            return json.dumps(
                [
                    {
                        "id": str(c.id),
                        "name": c.name,
                        "address": c.address,
                        "city": c.city,
                        "phone": c.phone,
                        "hours": c.hours,
                        "distance_km": getattr(c, "distance_km", None),
                    }
                    for c in centers
                ]
            )

        if name == "create_booking":
            data = await _build_booking_payload(db, arguments, location=location)
            booking = await booking_service.create_booking(db, data, user)
            return json.dumps(
                {
                    "booking_id": str(booking.id),
                    "status": booking.status,
                    "test_name": booking.test_name,
                    "collection_type": booking.collection_type,
                    "preferred_date": booking.preferred_date,
                    "message": "Booking created successfully.",
                }
            )

        if name == "create_payment_order":
            raw_ids = arguments.get("booking_ids") or []
            if not raw_ids:
                return json.dumps(
                    {"error": "Provide at least one booking_id (returned by create_booking) to pay for."}
                )
            try:
                booking_ids = [uuid.UUID(str(x)) for x in raw_ids]
            except ValueError:
                return json.dumps({"error": "One or more booking_ids are not valid IDs."})
            payment, bookings = await payment_service.create_order(db, booking_ids=booking_ids, user=user)
            # The frontend chat widget listens for a `payment_order` SSE event
            # (emitted alongside this tool result — see chat_service.py) and
            # renders a real, secure Razorpay checkout button from it. This
            # JSON is also returned to the model so it can describe it in words.
            return json.dumps(
                {
                    "key_id": settings.RAZORPAY_KEY_ID,
                    "order_id": payment.razorpay_order_id,
                    "amount": payment.amount,
                    "currency": payment.currency,
                    "booking_ids": [str(b.id) for b in bookings],
                    "total_rupees": round(payment.amount / 100, 2),
                    "message": (
                        "Payment order created. A secure 'Pay Now' button has been shown to the "
                        "user directly in the chat for this combined amount."
                    ),
                }
            )

        return json.dumps({"error": f"Unknown tool: {name}"})
    except AppError as exc:
        return json.dumps({"error": exc.message})
    except ValueError as exc:
        return json.dumps({"error": str(exc)})
    except Exception as exc:  # noqa: BLE001 - never let a tool crash the chat turn
        return json.dumps({"error": f"Tool execution failed: {exc}"})


async def _build_booking_payload(
    db: AsyncSession, arguments: dict, *, location: tuple[float, float] | None
) -> dict:
    collection_type = (arguments.get("collection_type") or "home").strip()
    if collection_type not in {"home", "center"}:
        raise ValueError("collection_type must be 'home' or 'center'")

    package_id = None
    package_name = (arguments.get("package_name") or "").strip()
    if package_name:
        packages = await catalog_service.list_active_packages(db)
        match = next((p for p in packages if p.name.lower() == package_name.lower()), None)
        if match is None:
            match = next((p for p in packages if package_name.lower() in p.name.lower()), None)
        if match is not None:
            package_id = match.id

    center_id = None
    raw_center_id = (arguments.get("center_id") or "").strip()
    if raw_center_id:
        try:
            center_id = uuid.UUID(raw_center_id)
        except ValueError:
            center_id = None
    if center_id is None and collection_type == "center" and location is not None:
        lat, lng = location
        nearest = await catalog_service.nearest_centers(db, lat=lat, lng=lng, limit=1)
        if nearest:
            center_id = nearest[0].id

    if collection_type == "home" and not (arguments.get("collection_address") or "").strip():
        raise ValueError("collection_address is required for home collection")
    if collection_type == "center" and center_id is None:
        raise ValueError("A center could not be determined — call find_nearest_centers first")

    return {
        "patient_name": arguments["patient_name"],
        "patient_phone": arguments["patient_phone"],
        "patient_email": arguments.get("patient_email") or None,
        "patient_age": arguments.get("patient_age"),
        "patient_gender": arguments.get("patient_gender") or None,
        "test_name": arguments.get("test_name") or None,
        "package_id": package_id,
        "center_id": center_id,
        "collection_type": collection_type,
        "collection_address": arguments.get("collection_address") or None,
        "preferred_date": arguments.get("preferred_date") or None,
        "preferred_time": arguments.get("preferred_time") or None,
        "notes": arguments.get("notes") or None,
        "is_urgent": bool(arguments.get("is_urgent") or False),
    }
