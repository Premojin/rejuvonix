import coaManifestJson from "../data/coa-manifest.json";

export type RejuvonixGoal = "weight-loss" | "performance" | "sexual-health" | "hair-restoration" | "skin-regeneration";

export type DocumentationStatus = "coa-available" | "official-documentation" | "quality-documentation";

export type CoaPart = { label: string; url: string };
export type CoaBatch = {
  id: string;
  label: string;
  formulation: string;
  lot: string;
  laboratory: string;
  testedAt: string;
  url: string;
  sha256: string;
  parts?: CoaPart[];
};

export type ProtocolItem = {
  slug: string;
  name: string;
  priceLabel: string;
  image: string;
  imageAlt: string;
  sourceCategory: string;
  goals: RejuvonixGoal[];
  summary: string;
  discussionPoints: string[];
  regulatoryNote: string;
  compoundedContext: "possible" | "not-applicable" | "verify";
  documentation: {
    status: DocumentationStatus;
    label: string;
    url?: string;
    source?: string;
    batches: CoaBatch[];
  };
};

export const protocolGoals: {slug: RejuvonixGoal; name: string; intro: string; assessmentRoute: string}[] = [
  {slug:"weight-loss",name:"Weight Loss",intro:"Metabolic and body-composition protocol education, with provider review required before any treatment decision.",assessmentRoute:"/eligibility/weight-loss"},
  {slug:"performance",name:"Performance",intro:"Recovery, resilience, energy and performance-oriented protocol education for discussion with an independent licensed provider.",assessmentRoute:"/eligibility/performance"},
  {slug:"sexual-health",name:"Sexual Health",intro:"Private protocol education related to sexual wellness and hormone-linked concerns, subject to provider evaluation.",assessmentRoute:"/eligibility/sexual-health"},
  {slug:"hair-restoration",name:"Hair Restoration",intro:"Protocol education relevant to hair and scalp goals, with treatment availability determined through provider review.",assessmentRoute:"/eligibility/hair-restoration"},
  {slug:"skin-regeneration",name:"Skin Regeneration",intro:"Protocol education related to skin quality, recovery and regenerative goals, without guaranteeing treatment availability.",assessmentRoute:"/eligibility/skin-restoration"},
];

// Master protocol inventory captured for the Rejuvonix protocol architecture.
// COA files in the published library are local, item-specific documents supplied for the matching protocol and batch.
type BaseProtocolItem = Omit<ProtocolItem, "documentation" | "priceLabel" | "image" | "imageAlt">;

const baseProtocols: BaseProtocolItem[] = [
  {slug:"semaglutide",name:"Semaglutide",sourceCategory:"Metabolic / body composition",goals:["weight-loss"],summary:"GLP-1 receptor agonist protocol education for weight-management pathways.",discussionPoints:["Personal health history and treatment goals","Medication history and contraindication screening","Whether an FDA-approved branded option or another pathway is clinically appropriate"],regulatoryNote:"Semaglutide is an active ingredient in FDA-approved prescription medicines. Compounded versions are not FDA approved and may be considered only when clinically appropriate and legally available.",compoundedContext:"possible"},
  {slug:"tirzepatide",name:"Tirzepatide",sourceCategory:"Metabolic / body composition",goals:["weight-loss"],summary:"Dual GIP/GLP-1 receptor agonist protocol education for weight-management pathways.",discussionPoints:["Personal health history and treatment goals","Medication history and contraindication screening","Whether an FDA-approved branded option or another pathway is clinically appropriate"],regulatoryNote:"Tirzepatide is an active ingredient in FDA-approved prescription medicines. Compounded versions are not FDA approved and may be considered only when clinically appropriate and legally available.",compoundedContext:"possible"},
  {slug:"aod-9604",name:"AOD-9604",sourceCategory:"Metabolic / body composition",goals:["weight-loss"],summary:"Educational metabolic-protocol listing; availability and appropriateness require verification.",discussionPoints:["Evidence supporting the intended goal","Regulatory and pharmacy availability","Potential alternatives with stronger evidence or approved indications"],regulatoryNote:"This protocol should not be presented as FDA-approved weight-loss treatment. Provider, pharmacy and legal availability must be verified before offering it clinically.",compoundedContext:"verify"},
  {slug:"mots-c",name:"MOTS-C",sourceCategory:"Metabolic / body composition",goals:["weight-loss","performance"],summary:"Mitochondrial peptide protocol education commonly discussed in metabolic and performance contexts.",discussionPoints:["Evidence quality for the intended goal","Current health status and laboratory context","Regulatory and pharmacy availability"],regulatoryNote:"Clinical availability and legal compounding status require verification. This educational page does not establish that treatment is available through Rejuvonix.",compoundedContext:"verify"},
  {slug:"tesamorelin",name:"Tesamorelin",sourceCategory:"Anti-aging / growth hormone",goals:["weight-loss","performance"],summary:"Growth-hormone-releasing factor analog education for provider-led discussion in appropriate clinical contexts.",discussionPoints:["Whether the intended use matches an approved indication","Relevant medical history and laboratory findings","Potential risks, contraindications and alternatives"],regulatoryNote:"Tesamorelin has an FDA-approved prescription indication that does not automatically extend to general weight loss or performance. Any use requires independent provider judgment.",compoundedContext:"verify"},
  {slug:"cjc-1295-ipamorelin",name:"CJC-1295 / Ipamorelin",sourceCategory:"Anti-aging / growth hormone",goals:["performance"],summary:"Growth-hormone secretagogue protocol education commonly discussed in recovery and performance settings.",discussionPoints:["Evidence quality and intended goal","Hormonal history and laboratory context","Regulatory, pharmacy and monitoring requirements"],regulatoryNote:"Availability, evidence and legal compounding status require verification. This listing is educational and is not a representation of an FDA-approved indication.",compoundedContext:"verify"},
  {slug:"sermorelin",name:"Sermorelin",sourceCategory:"Anti-aging / growth hormone",goals:["performance"],summary:"Growth-hormone-releasing hormone analog education for provider-led evaluation.",discussionPoints:["Symptoms and goals prompting evaluation","Laboratory context and endocrine history","Monitoring, contraindications and alternatives"],regulatoryNote:"Current clinical availability and compounding status should be verified. A provider determines whether any prescription pathway is appropriate.",compoundedContext:"verify"},
  {slug:"epithalon",name:"Epithalon",sourceCategory:"Anti-aging / growth hormone",goals:["performance","skin-regeneration"],summary:"Longevity-oriented peptide education included for evidence and availability review.",discussionPoints:["Strength and quality of human clinical evidence","Regulatory status and legal availability","Evidence-based alternatives for the stated goal"],regulatoryNote:"This protocol requires evidence, regulatory and pharmacy verification before any clinical availability is represented.",compoundedContext:"verify"},
  {slug:"ghk-cu",name:"GHK-Cu",sourceCategory:"Recovery / tissue repair",goals:["hair-restoration","skin-regeneration"],summary:"Copper-peptide education relevant to hair, skin and tissue-quality discussions.",discussionPoints:["Topical versus other formulation considerations","Skin or scalp history and sensitivities","Evidence, formulation and source documentation"],regulatoryNote:"Formulation and intended use materially affect regulatory status. Provider and pharmacy review is required for prescription or compounded pathways.",compoundedContext:"verify"},
  {slug:"bpc-157",name:"BPC-157",sourceCategory:"Recovery / tissue repair",goals:["performance","skin-regeneration"],summary:"Recovery-oriented peptide education presented with explicit availability verification.",discussionPoints:["Quality of available human evidence","Current FDA safety concerns and compounding status","Evidence-based alternatives for injury or recovery goals"],regulatoryNote:"BPC-157 is not FDA approved for human therapeutic use. Rejuvonix must not represent clinical availability unless legal, pharmacy and provider requirements are independently verified.",compoundedContext:"verify"},
  {slug:"tb-500",name:"TB-500",sourceCategory:"Recovery / tissue repair",goals:["performance","skin-regeneration"],summary:"Tissue-repair protocol education subject to evidence and availability review.",discussionPoints:["Human clinical evidence for the intended goal","Regulatory and pharmacy status","Safer or better-established alternatives"],regulatoryNote:"This listing is educational. Clinical availability, evidence and legal compounding status must be independently verified before treatment is offered.",compoundedContext:"verify"},
  {slug:"ss-31",name:"SS-31 / Elamipretide",sourceCategory:"Recovery / tissue repair",goals:["performance"],summary:"Mitochondrial-targeted peptide education for recovery and cellular-performance discussions.",discussionPoints:["Investigational status and evidence","Potential clinical-trial or approved alternatives","Regulatory and pharmacy availability"],regulatoryNote:"Elamipretide is available as an FDA-approved finished prescription product for a specific indication. Category placement here does not establish a general performance indication.",compoundedContext:"verify"},
  {slug:"thymosin-alpha-1",name:"Thymosin Alpha-1",sourceCategory:"Immune / inflammation",goals:["performance"],summary:"Immune-modulation protocol education mapped to the Rejuvonix resilience/performance goal for discovery purposes.",discussionPoints:["Reason for immune-focused evaluation","Evidence and approved alternatives","Regulatory and pharmacy availability"],regulatoryNote:"U.S. availability and intended-use status require verification. Category placement does not imply an approved performance indication.",compoundedContext:"verify"},
  {slug:"glutathione",name:"Glutathione",sourceCategory:"Immune / inflammation",goals:["performance","skin-regeneration"],summary:"Antioxidant-support protocol education relevant to resilience and skin-focused discussions.",discussionPoints:["Reason for considering supplementation or prescription therapy","Route-specific evidence and risks","Product source and formulation quality"],regulatoryNote:"Regulatory status and clinical evidence vary by formulation and route. Provider review is required for prescription pathways.",compoundedContext:"verify"},
  {slug:"semax-selank",name:"Semax / Selank",sourceCategory:"Cognitive / neurological",goals:["performance"],summary:"Cognitive and stress-oriented peptide education mapped to the Rejuvonix performance library.",discussionPoints:["Cognitive, mood or stress symptoms requiring appropriate evaluation","Evidence quality and U.S. regulatory status","Approved alternatives and interaction considerations"],regulatoryNote:"These compounds are not represented here as FDA-approved therapies. Clinical availability and legal status must be verified before any treatment pathway is offered.",compoundedContext:"verify"},
  {slug:"dsip",name:"DSIP",sourceCategory:"Cognitive / neurological",goals:["performance"],summary:"Sleep-related peptide education included for catalog completeness and provider-led evidence review.",discussionPoints:["Sleep symptoms and underlying causes","Evidence quality and regulatory status","Evidence-based sleep evaluation and treatment alternatives"],regulatoryNote:"This educational listing does not establish clinical availability or an FDA-approved indication.",compoundedContext:"verify"},
  {slug:"nad-plus",name:"NAD+",sourceCategory:"Cognitive / neurological",goals:["performance"],summary:"NAD+ protocol education related to cellular-energy and wellness discussions.",discussionPoints:["Goal and symptoms prompting interest","Route, formulation and evidence considerations","Potential risks and alternatives"],regulatoryNote:"Evidence and regulatory considerations vary by formulation and route. Provider review is required when a prescription or compounded product is involved.",compoundedContext:"verify"},
  {slug:"pt-141",name:"PT-141 / Bremelanotide",sourceCategory:"Sexual health / hormones",goals:["sexual-health"],summary:"Sexual-health protocol education involving melanocortin-receptor activity and provider evaluation.",discussionPoints:["Sexual-health history and goals","Cardiovascular and medication history","Whether an FDA-approved labeled option or another pathway is appropriate"],regulatoryNote:"Bremelanotide is the active ingredient in an FDA-approved prescription medicine for a specific indication. Applicability outside that indication requires careful provider and regulatory review.",compoundedContext:"verify"},
  {slug:"gonadorelin",name:"Gonadorelin",sourceCategory:"Sexual health / hormones",goals:["sexual-health","performance"],summary:"GnRH-related protocol education for hormone-focused provider discussions.",discussionPoints:["Reason for hormonal evaluation","Relevant laboratory testing and medical history","Approved indications, alternatives and monitoring"],regulatoryNote:"Use and availability depend on the exact product, indication and provider judgment. Category placement does not establish an approved performance indication.",compoundedContext:"verify"},
];


const protocolPresentation: Record<string, {priceLabel: string; image: string; imageAlt: string}> = {
  semaglutide: {priceLabel: "Current pricing confirmed in assessment", image: "/v6/compounded-medication-generic.png", imageAlt: "Compounded medication vial"},
  tirzepatide: {priceLabel: "Current pricing confirmed in assessment", image: "/v6/compounded-medication-generic.png", imageAlt: "Compounded medication vial"},
  "semax-selank": {priceLabel: "from $239/mo", image: "/v6/compounded-medication-generic.png", imageAlt: "Compounded medication vial"},
  dsip: {priceLabel: "from $199/mo", image: "/v6/compounded-medication-generic.png", imageAlt: "Compounded medication vial"},
  "nad-plus": {priceLabel: "from $159/mo", image: "/v6/compounded-medication-generic.png", imageAlt: "Compounded medication vial"},
};

const defaultProtocolPresentation = {
  priceLabel: "Current pricing confirmed in assessment",
  image: "/v6/compounded-medication-generic.png",
  imageAlt: "Compounded medication vial",
};

const documentationManifest = coaManifestJson as Record<string, ProtocolItem["documentation"]>;

export const protocols: ProtocolItem[] = baseProtocols.map((protocol) => ({
  ...protocol,
  ...(protocolPresentation[protocol.slug] ?? defaultProtocolPresentation),
  documentation: documentationManifest[protocol.slug] ?? {
    status: "quality-documentation",
    label: "Quality documentation",
    batches: [],
  },
}));

export const findProtocol = (slug:string) => protocols.find((protocol) => protocol.slug === slug);
export const findProtocolGoal = (slug:string) => protocolGoals.find((goal) => goal.slug === slug);
export const protocolsForGoal = (goal:RejuvonixGoal) => protocols.filter((protocol) => protocol.goals.includes(goal));
