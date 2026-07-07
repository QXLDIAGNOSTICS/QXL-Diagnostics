"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { api, ApiError, type LoginChallengeResponse } from "@/lib/api";
import { useAuth } from "@/lib/useAuth";

type Step = "credentials" | "verify";
type Mode = "login" | "register";

export interface LoginFlowProps {
  /** Called once the session cookie is confirmed present (login fully complete). */
  onComplete: () => void;
  /** Show the "Create an account" tab. Admin login hides this. */
  allowRegister?: boolean;
  inputClassName?: string;
  primaryButtonClassName?: string;
}

const defaultInputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500";
const defaultButtonClass =
  "block w-full bg-[#2563eb] text-white font-bold py-3.5 rounded-xl hover:bg-[#1d4ed8] transition-colors uppercase tracking-wider text-xs shadow-md text-center disabled:opacity-50 disabled:cursor-not-allowed";

export default function LoginFlow({
  onComplete,
  allowRegister = true,
  inputClassName = defaultInputClass,
  primaryButtonClassName = defaultButtonClass,
}: LoginFlowProps) {
  const { refresh } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [step, setStep] = useState<Step>("credentials");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // Login form
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  // Register form
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regName, setRegName] = useState("");
  const [regPassword, setRegPassword] = useState("");

  // Verify (2FA) state
  const [challenge, setChallenge] = useState<LoginChallengeResponse | null>(null);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [linkVerified, setLinkVerified] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  useEffect(() => stopPolling, [stopPolling]);

  const finishIfSessionReady = useCallback(async () => {
    try {
      await api.auth.me();
      stopPolling();
      await refresh();
      onComplete();
      return true;
    } catch {
      return false;
    }
  }, [onComplete, refresh, stopPolling]);

  const startPolling = useCallback(
    (challengeId: string) => {
      stopPolling();
      pollRef.current = setInterval(async () => {
        try {
          const status = await api.auth.loginStatus(challengeId);
          setOtpVerified(status.otp_verified);
          setLinkVerified(status.link_verified);
          if (status.completed) {
            const ready = await finishIfSessionReady();
            if (ready) return;
          }
        } catch {
          /* transient — keep polling */
        }
      }, 2500);
    },
    [finishIfSessionReady, stopPolling]
  );

  async function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await api.auth.login({ identifier, password });
      setChallenge(res);
      setOtpVerified(res.otp_verified);
      setLinkVerified(res.link_verified);
      setStep("verify");
      startPolling(res.challenge_id);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Login failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleRegisterSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await api.auth.register({
        email: regEmail,
        phone: regPhone,
        name: regName || null,
        password: regPassword,
      });
      setNotice("Account created — please sign in.");
      setMode("login");
      setIdentifier(regEmail);
      setPassword("");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Registration failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!challenge) return;
    setError(null);
    setBusy(true);
    try {
      const status = await api.auth.verifyOtp(challenge.challenge_id, otp);
      setOtpVerified(status.otp_verified);
      setLinkVerified(status.link_verified);
      if (status.completed) {
        await finishIfSessionReady();
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Invalid code");
    } finally {
      setBusy(false);
    }
  }

  if (step === "verify" && challenge) {
    const bothDone = otpVerified && linkVerified;
    return (
      <div className="space-y-4">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm space-y-1">
          <p className="font-semibold text-slate-700">Verify it's you</p>
          <p className="text-slate-500 text-xs">
            We sent a 6-digit code to {challenge.masked_email} and a verification link by SMS to{" "}
            {challenge.masked_phone}. Both are required to sign in.
          </p>
        </div>

        <ul className="text-xs space-y-1">
          <li className={otpVerified ? "text-green-600" : "text-slate-400"}>
            {otpVerified ? "✓" : "○"} Email code verified
          </li>
          <li className={linkVerified ? "text-green-600" : "text-slate-400"}>
            {linkVerified ? "✓" : "○"} SMS link verified {linkVerified ? "" : "— tap the link we texted you"}
          </li>
        </ul>

        {!otpVerified && (
          <form onSubmit={handleOtpSubmit} className="space-y-3">
            <input
              className={inputClassName}
              placeholder="6-digit code"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              required
            />
            <button type="submit" disabled={busy || otp.length < 4} className={primaryButtonClassName}>
              Verify Code
            </button>
          </form>
        )}

        {bothDone && (
          <p className="text-xs text-slate-400 text-center">Finalizing sign in…</p>
        )}

        {error && <p className="text-xs text-red-600">{error}</p>}

        <button
          type="button"
          onClick={() => {
            stopPolling();
            setStep("credentials");
            setChallenge(null);
            setOtp("");
            setError(null);
          }}
          className="text-xs text-slate-400 underline block mx-auto"
        >
          Start over
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {allowRegister && (
        <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 py-2 rounded-lg transition-colors ${mode === "login" ? "bg-white shadow text-[#0f2d5e]" : "text-slate-500"}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`flex-1 py-2 rounded-lg transition-colors ${mode === "register" ? "bg-white shadow text-[#0f2d5e]" : "text-slate-500"}`}
          >
            Create Account
          </button>
        </div>
      )}

      {notice && <p className="text-xs text-green-600">{notice}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}

      {mode === "login" ? (
        <form onSubmit={handleLoginSubmit} className="space-y-3">
          <input
            className={inputClassName}
            placeholder="Email or phone"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            autoComplete="username"
            required
          />
          <input
            className={inputClassName}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <button type="submit" disabled={busy} className={primaryButtonClassName}>
            {busy ? "Signing in…" : "Log In"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleRegisterSubmit} className="space-y-3">
          <input
            className={inputClassName}
            placeholder="Full name"
            value={regName}
            onChange={(e) => setRegName(e.target.value)}
            autoComplete="name"
          />
          <input
            className={inputClassName}
            placeholder="Email"
            type="email"
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <input
            className={inputClassName}
            placeholder="Phone (e.g. +919876543210)"
            value={regPhone}
            onChange={(e) => setRegPhone(e.target.value)}
            autoComplete="tel"
            required
          />
          <input
            className={inputClassName}
            placeholder="Password (min 8 chars, letters + numbers)"
            type="password"
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
          <button type="submit" disabled={busy} className={primaryButtonClassName}>
            {busy ? "Creating account…" : "Create Account"}
          </button>
        </form>
      )}
    </div>
  );
}
