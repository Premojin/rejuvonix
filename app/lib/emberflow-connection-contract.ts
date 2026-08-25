/**
 * EmberFlow integration is intentionally blocked until official provider
 * documentation, credentials, and approved contracts are supplied.
 *
 * This module contains status only. It deliberately does not define endpoint,
 * authentication, webhook, payload, or tenant configuration fields.
 */
export const emberFlowConnectionEnabled = false as const;

export type EmberFlowIntegrationStatus = {
  provider: "EmberFlow";
  status: "awaiting-official-documentation";
  connectionEnabled: false;
};

export const emberFlowIntegrationStatus: EmberFlowIntegrationStatus = {
  provider: "EmberFlow",
  status: "awaiting-official-documentation",
  connectionEnabled: false,
};
