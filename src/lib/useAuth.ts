"use client";

import { useCallback, useEffect, useState } from "react";

export interface AuthUser {
  id: string;
  email: string | null;
  phone: string | null;
  name: string | null;
  role: string;
  is_email_verified: boolean;
  is_phone_verified: boolean;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

/**
 * Reads the current session from the backend via /api/v1/auth/me.
 * The request is same-origin (proxied by next.config.ts rewrites), so the
 * httpOnly session cookie set by our first-party login flow (email/phone +
 * password + OTP + SMS link) is sent automatically — no tokens ever touch
 * this code, and there is no Auth0 involved.
 */
export function useAuth(): AuthState {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/v1/auth/me", { credentials: "include", cache: "no-store" });
      setUser(res.ok ? await res.json() : null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { user, loading, refresh };
}
