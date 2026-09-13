"use client";

import Link from "next/link";
import { useAuth } from "../components/AuthProvider";
import { SiteHeader } from "../components/SiteChrome";

export default function AccountPage() {
  const { state, message, signOut } = useAuth();
  async function handleSignOut() { const destination = await signOut(); if (destination) window.location.assign(destination); }

  return <main className="detail-page account-page"><SiteHeader/><section className="auth-shell"><div className="auth-form" aria-live="polite">
    <p className="detail-kicker">Patient account</p>
    {state === "loading" && <><h1>Checking your secure session.</h1><p>Rejuvonix is verifying your patient account.</p></>}
    {state === "authenticated" && <><h1>Your secure account is ready.</h1><p>Your identity is authenticated. Patient account features will appear as each approved service is activated.</p><button type="button" className="detail-primary" onClick={handleSignOut}>Sign out securely</button></>}
    {state === "anonymous" && <><h1>Sign in to continue.</h1><p>Your secure patient session is not active.</p><Link className="detail-primary" href="/patients/login">Go to patient sign in</Link></>}
    {(state === "auth-error" || state === "session-expired") && <><h1>Account access needs attention.</h1><p>{message ?? "We couldn't verify your session. Please sign in again."}</p><Link className="detail-primary" href="/sign-in">Sign in again</Link></>}
  </div></section></main>;
}
