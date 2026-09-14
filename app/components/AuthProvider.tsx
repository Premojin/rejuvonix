"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type AuthState = "loading" | "anonymous" | "authenticated" | "auth-error" | "session-expired";
type Principal = { status: string; roles: string[]; scopes: string[]; accountLabel?: string };
type AuthContextValue = { state: AuthState; principal?: Principal; message?: string; refresh: () => Promise<void>; signOut: () => Promise<string | undefined> };
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readCookie(name: string): string | undefined { return document.cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`))?.slice(name.length + 1); }

async function readSession(): Promise<{ principal?: Principal; state: AuthState; message?: string }> {
  try {
    const response = await fetch("/api/v1/auth/me", { credentials: "same-origin", headers: { accept: "application/json" } });
    if (response.ok) {
      const payload = await response.json() as { data?: { status?: string; roles?: string[]; scopes?: string[]; accountLabel?: string } };
      return payload.data ? { state: "authenticated", principal: { status: payload.data.status ?? "active", roles: payload.data.roles ?? [], scopes: payload.data.scopes ?? [], accountLabel: payload.data.accountLabel } } : { state: "auth-error", message: "We couldn't verify your session. Please sign in again." };
    }
    if (response.status === 401) {
      const payload = await response.json().catch(() => ({})) as { error?: { code?: string } };
      return payload.error?.code === "INVALID_AUTHENTICATION" ? { state: "session-expired", message: "We couldn't verify your session. Please sign in again." } : { state: "anonymous" };
    }
    return { state: "auth-error", message: "Account access is temporarily unavailable. Please try again." };
  } catch { return { state: "auth-error", message: "Account access is temporarily unavailable. Please try again." }; }
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>("loading");
  const [principal, setPrincipal] = useState<Principal>();
  const [message, setMessage] = useState<string>();
  const applySession = useCallback((result: { principal?: Principal; state: AuthState; message?: string }) => { setState(result.state); setPrincipal(result.principal); setMessage(result.message); }, []);
  const refresh = useCallback(async () => { setState("loading"); applySession(await readSession()); }, [applySession]);
  useEffect(() => { void readSession().then(applySession); }, [applySession]);
  const signOut = useCallback(async () => {
    const csrf = readCookie("rejuvonix_csrf");
    const response = await fetch("/api/v1/auth/signout", { method: "POST", credentials: "same-origin", headers: csrf ? { "x-csrf-token": csrf } : undefined });
    if (!response.ok) { setState("auth-error"); setMessage("We couldn't complete sign out. Please try again."); return undefined; }
    setState("anonymous"); setPrincipal(undefined);
    const configResponse = await fetch("/api/v1/auth/config", { credentials: "same-origin" });
    const config = await configResponse.json().catch(() => ({})) as { data?: { logoutEndpoint?: string; clientId?: string; logoutRedirectUri?: string } };
    if (configResponse.ok && config.data?.logoutEndpoint && config.data.clientId && config.data.logoutRedirectUri) {
      const params = new URLSearchParams({ client_id: config.data.clientId, logout_uri: config.data.logoutRedirectUri });
      return `${config.data.logoutEndpoint}?${params.toString()}`;
    }
    return "/";
  }, []);
  const value = useMemo(() => ({ state, principal, message, refresh, signOut }), [message, principal, refresh, signOut, state]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue { const context = useContext(AuthContext); if (!context) throw new Error("useAuth must be used within AuthProvider"); return context; }
