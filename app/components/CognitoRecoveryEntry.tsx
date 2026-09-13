"use client";

import { useState } from "react";
import { rememberReturnPath } from "./auth-navigation";

type Config = { loginEndpoint: string; clientId: string; redirectUri: string; state: string };

export default function CognitoRecoveryEntry() {
  const [message, setMessage] = useState("Your password reset is completed securely by Cognito.");
  const [busy, setBusy] = useState(false);
  async function begin() {
    setBusy(true); setMessage("Preparing secure account recovery…"); rememberReturnPath("/sign-in");
    try {
      const response = await fetch("/api/v1/auth/config");
      const payload = await response.json() as { data?: Config };
      if (!response.ok || !payload.data) { setMessage("Secure account recovery is not available right now. Please try again later."); setBusy(false); return; }
      const params = new URLSearchParams({ client_id: payload.data.clientId, response_type: "code", redirect_uri: payload.data.redirectUri, scope: "openid email profile", state: payload.data.state });
      window.location.assign(`${payload.data.loginEndpoint}?${params.toString()}`);
    } catch { setMessage("Secure account recovery is not available right now. Please try again later."); setBusy(false); }
  }
  return <div className="auth-form-inner"><p className="detail-kicker">Cognito recovery</p><h2>Reset securely.</h2><p className="auth-notice" role="status">{message}</p><button type="button" className="detail-primary" onClick={begin} disabled={busy} aria-busy={busy}>{busy ? "Connecting securely…" : "Continue"}</button></div>;
}
