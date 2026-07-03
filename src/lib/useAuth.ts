"use client";

import { useCallback, useEffect, useState } from "react";

export interface AuthUser {
  id: string;
  email: string | null;
  name: string | null;
  role: string;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

/**
 * Reads the current session from the backend via /api/v1/auth/me.
 * The request is same-origin (proxied by next.config.ts rewrites), so the
 * httpOnly qxl_session cookie set by the backend's OAuth callback is sent
 * automatically — no tokens ever touch this code.
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
