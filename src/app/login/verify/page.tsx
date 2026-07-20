"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/useAuth";

/**
 * Landing page for the SMS verification link:
 * GET /auth/login/verify-link redirects here as
 * `${FRONTEND_BASE_URL}/login/verify?challenge=<id>` after setting the
 * session cookie in *this* browser (if both factors are now satisfied).
 */
export default function LoginVerifyPage() {
  return (
    <Suspense fallback={null}>
      <LoginVerifyPageInner />
    </Suspense>
  );
}

function LoginVerifyPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, loading, refresh } = useAuth();
  const challengeId = searchParams.get("challenge");
  const [status, setStatus] = useState<"checking" | "waiting" | "done" | "error">("checking");

  useEffect(() => {
    let cancelled = false;
    let interval: ReturnType<typeof setInterval> | null = null;

    async function check() {
      try {
        const me = await api.auth.me();
        if (cancelled) return;
        if (!me) throw new Error("not authenticated");
        await refresh();
        setStatus("done");
        if (interval) clearInterval(interval);
        return;
      } catch {
        // Cookie not present in this browser yet — still poll the shared
        // challenge status in case the other factor completes.
      }
      if (!challengeId) {
        if (!cancelled) setStatus("error");
        return;
      }
      try {
        const s = await api.auth.loginStatus(challengeId);
        if (!cancelled) setStatus(s.completed ? "waiting" : "waiting");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    check();
    interval = setInterval(check, 2500);
    return () => {
      cancelled = true;
      if (interval) clearInterval(interval);
    };
  }, [challengeId, refresh]);

  useEffect(() => {
    if (status === "done" && user) {
      const t = setTimeout(() => router.push("/"), 1200);
      return () => clearTimeout(t);
    }
  }, [status, user, router]);

  return (
    <div className="bg-[#f8faff] min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-gray-150 rounded-3xl p-8 shadow-[0_4px_25px_rgba(0,0,0,0.02)] text-center space-y-4">
        {status === "done" ? (
          <>
            <div className="text-3xl">✓</div>
            <h2 className="text-[#0f2d5e] text-lg font-bold">You're verified</h2>
            <p className="text-slate-500 text-sm">Redirecting you now…</p>
          </>
        ) : status === "error" ? (
          <>
            <h2 className="text-[#0f2d5e] text-lg font-bold">Link invalid or expired</h2>
            <p className="text-slate-500 text-sm">
              Please return to the sign-in page and try again.
            </p>
          </>
        ) : (
          <>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <h2 className="text-[#0f2d5e] text-lg font-bold">Verifying…</h2>
            <p className="text-slate-500 text-sm">
              {loading
                ? "Checking session…"
                : "This link is confirmed. If you started signing in on a different device, switch back there to finish — this browser will also be signed in automatically."}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
