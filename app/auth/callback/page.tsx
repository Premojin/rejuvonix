"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { consumeReturnPath } from "../../components/auth-navigation";

export default function AuthCallbackPage() {
  const [message, setMessage] = useState("Completing secure sign-in…");
  const router = useRouter();
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    const state = new URLSearchParams(window.location.search).get("state");
    if (!code || !state) { queueMicrotask(() => setMessage("The sign-in response was incomplete.")); return; }
    void fetch("/api/v1/auth/callback", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ code, state }) }).then(async (response) => {
      if (!response.ok) throw new Error("Authentication could not be completed.");
      const verification = await fetch("/api/v1/auth/me", { credentials: "same-origin", headers: { accept: "application/json" } });
      if (!verification.ok) throw new Error("We couldn't verify your session. Please sign in again.");
      router.replace(consumeReturnPath() ?? "/account");
    }).catch(() => router.replace("/sign-in?authError=session"));
  }, [router]);
  return <main className="detail-page auth-page"><section className="auth-shell"><div className="auth-form"><p className="detail-kicker">Rejuvonix secure sign-in</p><h1>{message}</h1><Link className="detail-primary" href="/sign-in">Return to sign in</Link></div></section></main>;
}
