"use client";

import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

export interface AuthUser {
  id: string;
  email: string | null;
  phone: string | null;
  name: string | null;
  date_of_birth: string | null;
  role: string;
  is_email_verified: boolean;
  is_phone_verified: boolean;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  refresh: () => Promise<AuthUser | null>;
}

const AuthContext = createContext<AuthState | null>(null);

/**
 * Reads the current session from the backend via /api/v1/auth/me.
 * The request is same-origin (proxied by next.config.ts rewrites), so the
 * httpOnly session cookie set by our first-party login flow (email/phone +
 * password + OTP + SMS link) is sent automatically — no tokens ever touch
 * this code, and there is no Auth0 involved.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/v1/auth/me", { credentials: "include", cache: "no-store" });
      const nextUser = res.ok ? ((await res.json()) as AuthUser) : null;
      setUser(nextUser);
      return nextUser;
    } catch {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <AuthContext.Provider value={{ user, loading, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
