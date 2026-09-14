"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { rememberReturnPath } from "./auth-navigation";

type AuthMode = "sign-in" | "sign-up";
type AuthConfig = { authorizationEndpoint: string; signupEndpoint: string; clientId: string; redirectUri: string; state: string };

export default function CognitoAuthEntry({ mode }: { mode: AuthMode }) {
  const [message, setMessage] = useState(mode === "sign-up" ? "Create your secure Rejuvonix patient account through Cognito." : "Use the secure Rejuvonix sign-in to continue.");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (!new URLSearchParams(window.location.search).get("authError")) return;
    const task = window.setTimeout(() => setMessage("We couldn't verify your session. Please sign in again."), 0);
    return () => window.clearTimeout(task);
  }, []);

  async function begin() {
    setBusy(true);
    setMessage(mode === "sign-up" ? "Preparing secure registration…" : "Preparing secure sign-in…");
    try {
      rememberReturnPath(new URLSearchParams(window.location.search).get("returnTo"));
      const response = await fetch("/api/v1/auth/config");
      const payload = await response.json() as { data?: AuthConfig; error?: { message: string } };
      if (!response.ok || !payload.data) { setMessage(payload.error?.message ?? "Secure authentication is not available in this environment."); setBusy(false); return; }
      const params = new URLSearchParams({ response_type: "code", client_id: payload.data.clientId, redirect_uri: payload.data.redirectUri, scope: "openid email profile", state: payload.data.state });
      const endpoint = mode === "sign-up" ? payload.data.signupEndpoint : payload.data.authorizationEndpoint;
      window.location.assign(`${endpoint}?${params.toString()}`);
    } catch { setMessage("Secure authentication is not available in this environment."); setBusy(false); }
  }

  return <div className="auth-form">
    <p className="detail-kicker">{mode === "sign-up" ? "Patient registration" : "Patient sign in"}</p>
    <h2>{mode === "sign-up" ? "Create your secure account." : "Access your account."}</h2>
    <p className="auth-notice" role="status">{message}</p>
    <button type="button" className="detail-primary" onClick={begin} disabled={busy} aria-busy={busy}>{busy ? "Connecting securely…" : mode === "sign-up" ? "Create account" : "Sign in"}</button>
    <p>{mode === "sign-up" ? <>Already have an account? <Link href="/patients/login">Sign in</Link></> : <>New to Rejuvonix? <Link href="/sign-up">Create your secure account</Link></>}</p>
    <small>Passwords and verification are handled by Cognito. Rejuvonix does not store your password.</small>
  </div>;
}
