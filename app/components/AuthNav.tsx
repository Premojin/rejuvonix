"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { PATIENT_PORTAL_URL } from "./routing";

export default function AuthNav({ mobile = false }: { mobile?: boolean }) {
  const { state, principal, signOut } = useAuth();
  async function handleSignOut() { const destination = await signOut(); if (destination) window.location.assign(destination); }
  if (state === "loading") return <span className={mobile ? "auth-nav-mobile-status" : "auth-nav-status"}>Checking session…</span>;
  if (state === "authenticated") { const accountLabel = principal?.accountLabel ?? "Rejuvonix member"; return <span className={mobile ? "auth-nav-mobile" : "auth-nav"}><span className="auth-account" aria-label={`Signed in as ${accountLabel}`}><span className="auth-avatar" aria-hidden="true">{accountLabel.slice(0, 1).toUpperCase()}</span><span><small>Signed in as</small><strong>{accountLabel}</strong></span></span><Link href="/account">Account</Link><button type="button" onClick={handleSignOut}>Sign out</button></span>; }
  return <span className={mobile ? "auth-nav-mobile" : "auth-nav"}><a href={PATIENT_PORTAL_URL}>Sign in</a><Link className="detail-start" href="/sign-up">Get started</Link></span>;
}
