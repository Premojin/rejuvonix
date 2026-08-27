"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteHeader } from "../components/SiteChrome";

export default function SignInPage() {
  const [message, setMessage] = useState("Use the secure Rejuvonix sign-in to continue.");
  async function startSignIn() {
    setMessage("Preparing secure sign-in…");
    const response = await fetch("/api/v1/auth/config");
    const payload = await response.json() as { data?: { authorizationEndpoint: string; clientId: string; redirectUri: string; state: string }; error?: { message: string } };
    if (!response.ok || !payload.data) { setMessage(payload.error?.message ?? "Sign-in is not available in this environment."); return; }
    const params = new URLSearchParams({ response_type: "code", client_id: payload.data.clientId, redirect_uri: payload.data.redirectUri, scope: "openid email profile", state: payload.data.state });
    window.location.href = `${payload.data.authorizationEndpoint}?${params.toString()}`;
  }
  return <main className="detail-page auth-page"><SiteHeader/><section className="auth-shell"><div className="auth-photo"><img src="/rejuvonix-member-phone.png" alt="Rejuvonix member accessing care from home"/><div><p className="detail-kicker">Welcome back</p><h1>Your care is close.</h1></div></div><div className="auth-form"><p className="detail-kicker">Patient sign in</p><h2>Access your account.</h2><p className="auth-notice" role="status">{message}</p><button type="button" className="detail-primary" onClick={startSignIn}>Continue to secure sign in</button><a href="mailto:support@rejuvonix.com?subject=Password%20help">Contact support about access</a><p>New to Rejuvonix? <Link href="/get-started">Get started</Link></p></div></section></main>;
}
