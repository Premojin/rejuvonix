"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";

export default function AuthNav({ mobile = false }: { mobile?: boolean }) {
  const { state, signOut } = useAuth();
  async function handleSignOut() { const destination = await signOut(); if (destination) window.location.assign(destination); }
  if (state === "loading") return <span className={mobile ? "auth-nav-mobile-status" : "auth-nav-status"}>Checking session…</span>;
  if (state === "authenticated") return <span className={mobile ? "auth-nav-mobile" : "auth-nav"}><Link href="/account">Account</Link><button type="button" onClick={handleSignOut}>Sign out</button></span>;
  return <span className={mobile ? "auth-nav-mobile" : "auth-nav"}><Link href="/sign-in">Sign in</Link><Link className="detail-start" href="/sign-up">Get started</Link></span>;
}
