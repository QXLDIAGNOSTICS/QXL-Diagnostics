"use client";

import React, { useState } from "react";
import { Eye, EyeOff, KeyRound, Loader2, LogOut } from "lucide-react";
import { api, ApiError } from "@/lib/api";

const inputCls =
  "w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500";
const buttonCls =
  "flex w-full items-center justify-center gap-2 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-lg shadow-sky-600/30 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed";

/** Mirrors the backend rule (app.core.security.password_problem). */
export function passwordProblem(pw: string): string | null {
  if (pw.length < 8) return "At least 8 characters";
  if (pw.length > 72) return "At most 72 characters";
  if (!/[a-zA-Z]/.test(pw) || !/\d/.test(pw)) return "Use letters and numbers";
  return null;
}

function NewPasswordFields({
  value,
  confirm,
  onChange,
  onConfirm,
}: {
  value: string;
  confirm: string;
  onChange: (v: string) => void;
  onConfirm: (v: string) => void;
}) {
  const [show, setShow] = useState(false);
  const problem = value ? passwordProblem(value) : null;
  return (
    <div className="space-y-3">
      <div className="relative">
        <input
          className={inputCls}
          type={show ? "text" : "password"}
          autoComplete="new-password"
          placeholder="New password"
          aria-label="New password"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
        >
          {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
      <input
        className={inputCls}
        type={show ? "text" : "password"}
        autoComplete="new-password"
        placeholder="Confirm new password"
        aria-label="Confirm new password"
        value={confirm}
        onChange={(e) => onConfirm(e.target.value)}
      />
      <p className={`text-xs ${problem ? "text-amber-700" : "text-slate-500"}`}>
        {problem ?? "8+ characters with letters and numbers. Don't use your phone number or email."}
      </p>
    </div>
  );
}

function errText(e: unknown, fallback: string) {
  return e instanceof ApiError ? e.message : fallback;
}

/** Shown instead of the panel when the account signed in with a temporary password. */
export function ChangePasswordGate({ name, onDone, onSignOut }: { name: string; onDone: () => void; onSignOut: () => void }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const problem = passwordProblem(next);
    if (problem) return setError(problem);
    if (next !== confirm) return setError("The new passwords don't match");
    setBusy(true);
    setError(null);
    try {
      await api.auth.passwordChange(current, next);
      onDone();
    } catch (err) {
      setError(errText(err, "Couldn't change the password"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f8ff] dark:bg-gray-950 flex items-center justify-center p-4">
      <form onSubmit={submit} className="max-w-md w-full space-y-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
          <KeyRound className="h-7 w-7" />
        </div>
        <h1 className="text-center text-xl font-bold text-slate-900 dark:text-white">Set your password</h1>
        <p className="text-center text-sm text-slate-500">
          Welcome{name ? `, ${name}` : ""}. You signed in with a temporary password from your administrator. Choose your own to continue.
        </p>
        <input
          className={inputCls}
          type="password"
          autoComplete="current-password"
          placeholder="Temporary password"
          aria-label="Temporary password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
        />
        <NewPasswordFields value={next} confirm={confirm} onChange={setNext} onConfirm={setConfirm} />
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        <button className={buttonCls} disabled={busy || !current || !next || !confirm}>
          {busy && <Loader2 className="h-4 w-4 animate-spin" />} Save password
        </button>
        <button type="button" onClick={onSignOut} className="mx-auto flex items-center gap-1 text-xs text-slate-500 underline">
          <LogOut className="h-3 w-3" /> Sign out
        </button>
      </form>
    </div>
  );
}

/** Forgot password: a code by SMS + a second code by email, then a new password. */
export function ForgotPasswordFlow({ onDone, onCancel }: { onDone: () => void; onCancel: () => void }) {
  const [identifier, setIdentifier] = useState("");
  const [resetId, setResetId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [phoneCode, setPhoneCode] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const start = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const r = await api.auth.passwordForgot(identifier.trim());
      setResetId(r.reset_id);
      setNotice(r.message);
    } catch (err) {
      setError(errText(err, "Couldn't start the reset"));
    } finally {
      setBusy(false);
    }
  };

  const finish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetId) return;
    const problem = passwordProblem(next);
    if (problem) return setError(problem);
    if (next !== confirm) return setError("The new passwords don't match");
    setBusy(true);
    setError(null);
    try {
      await api.auth.passwordReset({
        reset_id: resetId,
        phone_code: phoneCode.trim(),
        email_code: emailCode.trim() || undefined,
        new_password: next,
      });
      setDone(true);
    } catch (err) {
      setError(errText(err, "Couldn't reset the password"));
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-300">Your password has been changed. Sign in with the new one.</p>
        <button className={buttonCls} onClick={onDone}>
          Back to sign in
        </button>
      </div>
    );
  }

  return resetId ? (
    <form onSubmit={finish} className="space-y-3">
      <p className="text-sm text-slate-600 dark:text-slate-300">{notice}</p>
      <input
        className={inputCls}
        inputMode="numeric"
        autoComplete="one-time-code"
        placeholder="Code from SMS"
        aria-label="Code from SMS"
        value={phoneCode}
        onChange={(e) => setPhoneCode(e.target.value.replace(/\D/g, ""))}
      />
      <input
        className={inputCls}
        inputMode="numeric"
        placeholder="Code from email"
        aria-label="Code from email"
        value={emailCode}
        onChange={(e) => setEmailCode(e.target.value.replace(/\D/g, ""))}
      />
      <NewPasswordFields value={next} confirm={confirm} onChange={setNext} onConfirm={setConfirm} />
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      <button className={buttonCls} disabled={busy || !phoneCode || !next || !confirm}>
        {busy && <Loader2 className="h-4 w-4 animate-spin" />} Reset password
      </button>
      <button type="button" onClick={onCancel} className="block mx-auto text-xs text-slate-500 underline">
        Cancel
      </button>
    </form>
  ) : (
    <form onSubmit={start} className="space-y-3">
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Enter your email or mobile number. We&apos;ll send one code by SMS and another by email — you need both.
      </p>
      <input
        className={inputCls}
        autoComplete="username"
        placeholder="Email or phone"
        aria-label="Email or phone"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
      />
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      <button className={buttonCls} disabled={busy || identifier.trim().length < 3}>
        {busy && <Loader2 className="h-4 w-4 animate-spin" />} Send codes
      </button>
      <button type="button" onClick={onCancel} className="block mx-auto text-xs text-slate-500 underline">
        Back to sign in
      </button>
    </form>
  );
}
