"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteHeader } from "../components/SiteChrome";

type AccountState = "loading" | "authenticated" | "unauthenticated" | "unavailable";

function readCookie(name: string): string | undefined {
  return document.cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`))?.slice(name.length + 1);
}

export default function AccountPage() {
  const [state, setState] = useState<AccountState>("loading");

  useEffect(() => {
    void fetch("/api/v1/auth/me").then((response) => {
      setState(response.ok ? "authenticated" : response.status === 401 ? "unauthenticated" : "unavailable");
    }).catch(() => setState("unavailable"));
  }, []);

  async function signOut() {
    const csrf = readCookie("rejuvonix_csrf");
    const response = await fetch("/api/v1/auth/signout", { method: "POST", headers: csrf ? { "x-csrf-token": csrf } : undefined });
    if (response.ok) setState("unauthenticated");
  }

  return <main className="detail-page account-page"><SiteHeader/><section className="auth-shell"><div className="auth-form" aria-live="polite">
    <p className="detail-kicker">Patient account</p>
    {state === "loading" && <><h1>Checking your secure session.</h1><p>Rejuvonix is verifying your patient account.</p></>}
    {state === "authenticated" && <><h1>Your secure account is ready.</h1><p>Your identity is authenticated. Patient account features will appear as each approved service is activated.</p><button type="button" className="detail-primary" onClick={signOut}>Sign out securely</button></>}
    {state === "unauthenticated" && <><h1>Sign in to continue.</h1><p>Your secure patient session is not active.</p><Link className="detail-primary" href="/patients/login">Go to patient sign in</Link></>}
    {state === "unavailable" && <><h1>Account access is temporarily unavailable.</h1><p>Please try again later or contact support. No account information was displayed.</p><Link className="detail-primary" href="/patients/login">Return to patient sign in</Link></>}
  </div></section></main>;
}
