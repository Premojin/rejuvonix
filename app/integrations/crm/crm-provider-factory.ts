import { CrmProviderError } from "./crm-errors.ts";
import { EmberFlowCrmProvider } from "./emberflow-crm-provider.ts";
import { MockCrmProvider } from "./mock-crm-provider.ts";
import type { CrmAuthMode, CrmProvider, CrmProviderConfig, CrmProviderMode } from "./crm-provider.ts";

function authModeFromEnv(value: string | undefined): CrmAuthMode {
  const modes: CrmAuthMode[] = ["NONE", "API_KEY", "BEARER_TOKEN", "OAUTH_CLIENT_CREDENTIALS", "OAUTH_AUTHORIZATION_CODE", "LOCATION_TOKEN", "PRIVATE_INTEGRATION_TOKEN", "CUSTOM"];
  return modes.includes(value as CrmAuthMode) ? value as CrmAuthMode : "NONE";
}

export function getCrmProviderConfig(env: NodeJS.ProcessEnv = process.env): CrmProviderConfig {
  const mode = (env.CRM_PROVIDER_MODE ?? "not_configured") as CrmProviderMode;
  return {
    provider: env.CRM_PROVIDER ?? "crm",
    mode: mode === "mock" || mode === "crm" ? mode : "not_configured",
    apiBaseUrl: env.CRM_API_BASE_URL,
    authMode: authModeFromEnv(env.CRM_AUTH_MODE),
    tenantId: env.CRM_TENANT_ID,
    locationId: env.CRM_LOCATION_ID,
    timeoutMs: Number(env.CRM_TIMEOUT_MS ?? 5000),
  };
}

export function getCrmProvider(config = getCrmProviderConfig()): CrmProvider {
  if (config.mode === "mock") {
    const environment = process.env.APP_ENV ?? "local";
    if (environment !== "local" && environment !== "test") {
      throw new CrmProviderError("INTEGRATION_NOT_CONFIGURED", "Mock CRM is restricted to local and test environments.", { provider: config.provider, operation: "factory" });
    }
    return new MockCrmProvider(config);
  }
  if (config.mode === "crm") {
    if (!config.apiBaseUrl || config.authMode === "NONE") {
      throw new CrmProviderError("INTEGRATION_NOT_CONFIGURED", "CRM mode requires validated provider configuration.", { provider: config.provider, operation: "factory" });
    }
    return new EmberFlowCrmProvider(config);
  }
  return new EmberFlowCrmProvider({ ...config, mode: "not_configured" });
}
