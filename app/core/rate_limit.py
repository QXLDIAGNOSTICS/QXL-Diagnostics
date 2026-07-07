"""Shared slowapi rate limiter instance.

Kept in its own module (rather than defined in ``app.main``) so endpoint
modules can import it directly (e.g. ``@limiter.limit(...)``) without a
circular import back through ``app.main``.
"""
from __future__ import annotations

from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address, default_limits=["120/minute"])
