"""Tool (function-calling) definitions the chat assistant can invoke to ground
its answers in real backend data: catalog search, centers, bookings, and the
current user's analyzed prescriptions.
"""
from __future__ import annotations

import json
import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User
from app.services import booking_service, catalog_service, prescription_service

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
]


async def execute_tool(
    name: str, arguments: dict, *, db: AsyncSession, user: User
) -> str:
    """Dispatch a tool call by name and return a JSON string result."""
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

        return json.dumps({"error": f"Unknown tool: {name}"})
    except Exception as exc:  # noqa: BLE001 - never let a tool crash the chat turn
        return json.dumps({"error": f"Tool execution failed: {exc}"})
