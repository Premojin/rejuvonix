export type EmberFlowConnectionMode="hosted-handoff"|"api";

export type EmberFlowConnectionConfiguration={
  mode:EmberFlowConnectionMode;
  environment:"sandbox"|"production";
  baseUrl:string;
  authenticationMethod:string;
  accountOrTenantId:string;
  programMappings:Record<"weight-loss"|"performance"|"sexual-health"|"hair-restoration"|"skin-restoration",string>;
  webhookSigningMethod:string;
  webhookEventNames:readonly string[];
  baaConfirmed:boolean;
  approvedBy:string;
  approvedAt:string;
};

export const emberFlowConnectionEnabled=false;

export function validateEmberFlowConfiguration(config:EmberFlowConnectionConfiguration):string[]{
  const errors:string[]=[];
  if(config.environment!=="sandbox") errors.push("Initial integration testing must use EmberFlow's sandbox environment.");
  if(!config.baseUrl.startsWith("https://")) errors.push("The EmberFlow endpoint must use HTTPS.");
  if(!config.authenticationMethod.trim()) errors.push("Authentication documentation is required.");
  if(!config.accountOrTenantId.trim()) errors.push("The Rejuvonix EmberFlow account or tenant identifier is required.");
  if(!config.webhookSigningMethod.trim()) errors.push("Signed webhook verification is required.");
  if(!config.baaConfirmed) errors.push("BAA coverage must be confirmed before transmitting patient information.");
  if(!config.approvedBy.trim()||!config.approvedAt.trim()) errors.push("The approved configuration must identify its approver and approval date.");
  for(const [program,mapping] of Object.entries(config.programMappings)) if(!mapping.trim()) errors.push(`EmberFlow program mapping is missing for ${program}.`);
  return errors;
}
