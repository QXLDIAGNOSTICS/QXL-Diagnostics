"use client";

import { useCallback, useState } from "react";
import { api, ApiError, type AuthMeResponse, type LoginChallengeResponse } from "@/lib/api";
import { useAuth } from "@/lib/useAuth";

type Step = "credentials" | "verify";
type LoginVariant = "patient_phone_otp" | "password_otp";

export interface LoginFlowProps {
  /** Called once the session cookie is confirmed present (login fully complete). */
  onComplete: (user?: AuthMeResponse) => void;
  /** Patient flow is phone+OTP (auto-creates the account on first login);
   * admin flow is identifier+password, then OTP+admin secret. */
  loginVariant?: LoginVariant;
  /** Require admin secret key in OTP step (admin login). */
  requireAdminSecret?: boolean;
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
  requireAdminSecret = false,
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

  // Verify (OTP) state
  const [challenge, setChallenge] = useState<LoginChallengeResponse | null>(null);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [adminSecretKey, setAdminSecretKey] = useState("");

  const finishIfSessionReady = useCallback(async () => {
    try {
      const me = await api.auth.me();
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
      setChallenge(res);
      setOtpVerified(res.otp_verified);
      setStep("verify");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Login failed");
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
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm space-y-1">
          <p className="font-semibold text-slate-700">Verify it's you</p>
          <p className="text-slate-500 text-xs">
            We sent an 8-digit code to {challenge.masked_phone}.
            {challenge.masked_email && challenge.masked_email !== "***" && (
              <> Account: {challenge.masked_email}.</>
            )}
          </p>
        </div>

        <ul className="text-xs space-y-1">
          <li className={otpVerified ? "text-green-600" : "text-slate-400"}>
            {otpVerified ? "✓" : "○"} OTP verified
          </li>
        </ul>

        {!otpVerified && (
          <form onSubmit={handleOtpSubmit} className="space-y-3">
            <input
              className={inputClassName}
              placeholder="8-digit OTP"
              inputMode="numeric"
              maxLength={8}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              required
            />
            {requireAdminSecret && (
              <input
                className={inputClassName}
                type="password"
                placeholder="Admin secret key"
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
          </form>
        )}

        {error && <p className="text-xs text-red-600">{error}</p>}

        <button
          type="button"
          onClick={() => {
            setStep("credentials");
            setChallenge(null);
            setOtp("");
            setAdminSecretKey("");
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
      {error && <p className="text-xs text-red-600">{error}</p>}

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
            <input
              className={inputClassName}
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </>
        )}
        <button type="submit" disabled={busy} className={primaryButtonClassName}>
          {busy ? "Signing in…" : "Log In"}
        </button>
      </form>
    </div>
  );
}
