export const intakePrograms=["weight-loss","performance","sexual-health","hair-restoration","skin-restoration"] as const;
export type IntakeProgram=(typeof intakePrograms)[number];
export const intakeStatuses=["draft","ready-for-review","submitted","under-review","closed"] as const;
export type IntakeStatus=(typeof intakeStatuses)[number];
export const consentTypes=["terms","privacy","telehealth","communications"] as const;
export type ConsentType=(typeof consentTypes)[number];
export type IntakeFieldDefinition={key:string;label:string;section:"general"|"identity"|"medical"|"medication"|"fulfillment"|"consent";clinicalApproval:"not-required"|"required"|"approved";required:boolean;sensitive:boolean};
export type ConsentDocument={type:ConsentType;version:string;sha256:string;effectiveAt:string};
