"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { api, ApiError, type AuthMeResponse, type LoginChallengeResponse } from "@/lib/api";
import { useAuth } from "@/lib/useAuth";

const REMEMBERED_IDENTIFIER_KEY = "qxl_admin_remembered_identifier";

type Step = "credentials" | "verify";
type LoginVariant = "patient_phone_otp" | "password_otp";

export interface LoginFlowProps {
  /** Called once the session cookie is confirmed present (login fully complete). */
  onComplete: (user?: AuthMeResponse) => void;
  /** Patient flow is phone+OTP (auto-creates the account on first login);
   * admin flow is identifier+password, then OTP+admin secret. */
  loginVariant?: LoginVariant;
  inputClassName?: string;
  primaryButtonClassName?: string;
}

const defaultInputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500";
const defaultButtonClass =
  "block w-full bg-[#2563eb] text-white font-bold py-3.5 rounded-xl hover:bg-[#1d4ed8] transition-colors uppercase tracking-wider text-xs shadow-md text-center disabled:opacity-50 disabled:cursor-not-allowed";

export default function LoginFlow({
  onComplete,
  loginVariant = "password_otp",
  inputClassName = defaultInputClass,
  primaryButtonClassName = defaultButtonClass,
}: LoginFlowProps) {
  const { refresh } = useAuth();
  const [step, setStep] = useState<Step>("credentials");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Login form
  const [phone, setPhone] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Verify (OTP) state
  const [challenge, setChallenge] = useState<LoginChallengeResponse | null>(null);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [adminSecretKey, setAdminSecretKey] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resending, setResending] = useState(false);
  const otpInputRef = useRef<HTMLInputElement>(null);
  // Only the Super Admin account is asked for the secret key — the API tells
  // us per-login whether this identifier resolves to one, so front office /
  // staff / admin accounts never see this field at all.
  const requireAdminSecret = challenge?.requires_admin_secret ?? false;

  useEffect(() => {
    if (loginVariant !== "password_otp") return;
    const remembered = typeof window !== "undefined" ? window.localStorage.getItem(REMEMBERED_IDENTIFIER_KEY) : null;
    if (remembered) {
      setIdentifier(remembered);
      setRememberMe(true);
    }
  }, [loginVariant]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  useEffect(() => {
    if (step === "verify" && !otpVerified) otpInputRef.current?.focus();
  }, [step, otpVerified]);

  const finishIfSessionReady = useCallback(async () => {
    try {
      const me = await api.auth.me();
      if (!me) return false;
      await refresh();
      onComplete(me);
      return true;
    } catch {
      return false;
    }
  }, [onComplete, refresh]);

  async function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res =
        loginVariant === "patient_phone_otp"
          ? await api.auth.loginPhoneOtp({ phone })
          : await api.auth.login({ identifier, password });
      if (loginVariant === "password_otp" && typeof window !== "undefined") {
        if (rememberMe) window.localStorage.setItem(REMEMBERED_IDENTIFIER_KEY, identifier);
        else window.localStorage.removeItem(REMEMBERED_IDENTIFIER_KEY);
      }
      setChallenge(res);
      setOtpVerified(res.otp_verified);
      setResendCooldown(30);
      setStep("verify");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Login failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleResendOtp() {
    if (resendCooldown > 0 || resending) return;
    setResending(true);
    setError(null);
    try {
      const res =
        loginVariant === "patient_phone_otp"
          ? await api.auth.loginPhoneOtp({ phone })
          : await api.auth.login({ identifier, password });
      setChallenge(res);
      setOtpVerified(res.otp_verified);
      setOtp("");
      setResendCooldown(30);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not resend the code");
    } finally {
      setResending(false);
    }
  }

  async function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!challenge) return;
    setError(null);
    setBusy(true);
    try {
      const status = await api.auth.verifyOtp(
        challenge.challenge_id,
        otp,
        requireAdminSecret ? adminSecretKey : undefined
      );
      setOtpVerified(status.otp_verified);
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
    return (
      <div className="space-y-4">
        <div className="bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl p-4 text-sm space-y-1">
          <p className="font-semibold text-slate-700 dark:text-slate-200">Verify it's you</p>
          <p className="text-slate-500 dark:text-slate-400 text-xs">
            We sent an 8-digit code to {challenge.masked_phone}.
            {challenge.masked_email && challenge.masked_email !== "***" && (
              <> Account: {challenge.masked_email}.</>
            )}
          </p>
          {requireAdminSecret && (
            <p className="text-sky-700 dark:text-sky-400 text-xs font-semibold pt-1">
              Super Admin account detected — the secret key is required below.
            </p>
          )}
        </div>

        <ul className="text-xs space-y-1">
          <li className={otpVerified ? "text-green-600 dark:text-green-400" : "text-slate-400 dark:text-slate-500"}>
            {otpVerified ? "✓" : "○"} OTP verified
          </li>
        </ul>

        {!otpVerified && (
          <form onSubmit={handleOtpSubmit} className="space-y-3">
            <input
              ref={otpInputRef}
              className={inputClassName}
              placeholder="8-digit OTP"
              inputMode="numeric"
              maxLength={8}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              autoComplete="one-time-code"
              required
            />
            {requireAdminSecret && (
              <input
                className={inputClassName}
                type="password"
                placeholder="Super Admin secret key"
                value={adminSecretKey}
                onChange={(e) => setAdminSecretKey(e.target.value)}
                required
              />
            )}
            <button
              type="submit"
              disabled={busy || otp.length < 8 || (requireAdminSecret && !adminSecretKey.trim())}
              className={primaryButtonClassName}
            >
              Verify Code
            </button>
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendCooldown > 0 || resending}
              className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 disabled:opacity-60 block mx-auto cursor-pointer"
            >
              {resending
                ? "Resending…"
                : resendCooldown > 0
                ? `Resend code in ${resendCooldown}s`
                : "Resend code"}
            </button>
          </form>
        )}

        {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}

        <button
          type="button"
          onClick={() => {
            setStep("credentials");
            setChallenge(null);
            setOtp("");
            setAdminSecretKey("");
            setError(null);
          }}
          className="text-xs text-slate-400 dark:text-slate-500 underline block mx-auto"
        >
          Start over
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}

      <form onSubmit={handleLoginSubmit} className="space-y-3">
        {loginVariant === "patient_phone_otp" ? (
          <input
            className={inputClassName}
            placeholder="Phone (e.g. +919876543210)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            required
          />
        ) : (
          <>
            <input
              className={inputClassName}
              placeholder="Email or phone"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              autoComplete="username"
              required
            />
            <div className="relative">
              <input
                className={inputClassName}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <label className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-gray-300"
              />
              Remember my email/phone on this device
            </label>
          </>
        )}
        <button type="submit" disabled={busy} className={primaryButtonClassName}>
          {busy ? "Signing in…" : "Log In"}
        </button>
      </form>
    </div>
  );
}
