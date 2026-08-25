import type {IntakeFieldDefinition} from "./intake-contract";

// Review registry only. Importing this file must never enable a question,
// branch, disposition rule or database write. Every medical field remains
// pending prescribing-medical-group approval.
export const weightLossClinicalDraft:readonly IntakeFieldDefinition[]=[
  {key:"sex_at_birth",label:"Sex assigned at birth",section:"medical",clinicalApproval:"required",required:true,sensitive:true},
  {key:"pregnancy_status",label:"Pregnant, breastfeeding or trying to conceive",section:"medical",clinicalApproval:"required",required:false,sensitive:true},
  {key:"date_of_birth",label:"Date of birth",section:"identity",clinicalApproval:"required",required:true,sensitive:true},
  {key:"diagnosed_conditions",label:"Diagnosed conditions",section:"medical",clinicalApproval:"required",required:true,sensitive:true},
  {key:"surgeries",label:"Surgeries or procedures",section:"medical",clinicalApproval:"required",required:true,sensitive:true},
  {key:"surgery_details",label:"Surgery or procedure details and year",section:"medical",clinicalApproval:"required",required:false,sensitive:true},
  {key:"weight_loss_surgery",label:"Weight-loss surgery history",section:"medical",clinicalApproval:"required",required:true,sensitive:true},
  {key:"prior_glp1_use",label:"Previous or current GLP-1 use",section:"medication",clinicalApproval:"required",required:true,sensitive:true},
  {key:"prior_glp1_name",label:"GLP-1 medication name",section:"medication",clinicalApproval:"required",required:false,sensitive:true},
  {key:"prior_glp1_dose",label:"Most recent GLP-1 dose",section:"medication",clinicalApproval:"required",required:false,sensitive:true},
  {key:"prior_glp1_last_date",label:"Date of most recent GLP-1 dose",section:"medication",clinicalApproval:"required",required:false,sensitive:true},
  {key:"prior_glp1_duration",label:"Duration of GLP-1 use",section:"medication",clinicalApproval:"required",required:false,sensitive:true},
  {key:"prior_glp1_side_effects",label:"Previous GLP-1 side effects",section:"medication",clinicalApproval:"required",required:false,sensitive:true},
  {key:"current_medications",label:"Current medications and supplements",section:"medication",clinicalApproval:"required",required:true,sensitive:true},
  {key:"current_medication_details",label:"Medication and supplement names and doses",section:"medication",clinicalApproval:"required",required:false,sensitive:true},
  {key:"ingredient_allergies",label:"Known ingredient allergies",section:"medical",clinicalApproval:"required",required:true,sensitive:true},
  {key:"other_allergies",label:"Other medication or food allergies",section:"medical",clinicalApproval:"required",required:true,sensitive:true},
  {key:"other_allergy_details",label:"Other allergy details",section:"medical",clinicalApproval:"required",required:false,sensitive:true},
  {key:"resting_heart_rate",label:"Resting heart rate range",section:"medical",clinicalApproval:"required",required:true,sensitive:true},
  {key:"side_effect_impact",label:"Potential impact of nausea, vomiting or fatigue",section:"medical",clinicalApproval:"required",required:true,sensitive:true},
  {key:"first_name",label:"First name",section:"identity",clinicalApproval:"not-required",required:true,sensitive:true},
  {key:"last_name",label:"Last name",section:"identity",clinicalApproval:"not-required",required:true,sensitive:true},
  {key:"email",label:"Email address",section:"identity",clinicalApproval:"not-required",required:true,sensitive:true},
  {key:"phone",label:"Phone number",section:"identity",clinicalApproval:"not-required",required:true,sensitive:true},
  {key:"street",label:"Street address",section:"fulfillment",clinicalApproval:"not-required",required:true,sensitive:true},
  {key:"unit",label:"Apartment or suite",section:"fulfillment",clinicalApproval:"not-required",required:false,sensitive:true},
  {key:"city",label:"City",section:"fulfillment",clinicalApproval:"not-required",required:true,sensitive:true},
  {key:"state",label:"State",section:"fulfillment",clinicalApproval:"required",required:true,sensitive:true},
  {key:"postal_code",label:"ZIP code",section:"fulfillment",clinicalApproval:"not-required",required:true,sensitive:true},
];

export const weightLossAutomatedDispositionRulesEnabled=false;
