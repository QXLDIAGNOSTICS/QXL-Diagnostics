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
 * Reads the current session from /api/v1/auth/me.
 * Backend returns 200 + user when signed in, or 200 + null for guests
 * (never 401), so Lighthouse does not flag console network errors.
 * Session cookie is httpOnly — JS cannot peek at it before calling.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/v1/auth/me", { credentials: "include", cache: "no-store" });
      if (!res.ok) {
        setUser(null);
        return null;
      }
      const body = await res.json();
      const nextUser = body && typeof body === "object" && body.id ? (body as AuthUser) : null;
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
