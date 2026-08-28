export type RejuvonixGoal = "weight-loss" | "performance" | "sexual-health" | "hair-restoration" | "skin-regeneration";

export type DocumentationStatus = "coa-verified" | "official-documentation" | "pending-verification" | "not-applicable";
export type ApprovalStatus = "fda-approved" | "historical-discontinued" | "not-fda-approved" | "route-dependent";
export type BioPivotCoaStatus = "verified" | "not-required" | "unverified";
export type BioPivotCoaRecord = {
  status: BioPivotCoaStatus;
  note: string;
  /** Direct source document when BioPivot exposes a stable certificate URL. */
  url?: string;
  /** Original BioPivot certificate/source URL retained for traceability when a local copy is imported. */
  sourceUrl?: string;
  /** Local immutable copy under public/documents/biopivot-coa after exact-match verification. */
  importedUrl?: string;
  laboratory?: string;
  lot?: string;
  testedAt?: string;
  testMethods?: string[];
  verifiedAt?: string;
};
export type ProtocolReferenceKind = "official-label" | "fda-approval" | "fda-safety" | "fda-regulatory" | "peer-reviewed";

export type ProtocolReference = {
  label: string;
  url: string;
  kind: ProtocolReferenceKind;
};

export type ProtocolItem = {
  slug: string;
  name: string;
  sourceCategory: string;
  goals: RejuvonixGoal[];
  summary: string;
  discussionPoints: string[];
  regulatoryNote: string;
  compoundedContext: "possible" | "not-applicable" | "verify";
  approval: { status: ApprovalStatus; label: string; approvedUse?: string };
  clinical: { overview: string; mechanism: string; evidenceContext: string; safetyPoints: string[] };
  documentation: { status: DocumentationStatus; label: string; url?: string; lot?: string; testedAt?: string; source?: string };
  bioPivotCoa: BioPivotCoaRecord;
  references: ProtocolReference[];
};

export const protocolGoals: {slug: RejuvonixGoal; name: string; intro: string; assessmentRoute: string}[] = [
  {slug:"weight-loss",name:"Weight Loss",intro:"Metabolic and body-composition protocol education, with provider review required before any treatment decision.",assessmentRoute:"/eligibility/weight-loss"},
  {slug:"performance",name:"Performance",intro:"Recovery, resilience, energy and performance-oriented protocol education for discussion with an independent licensed provider.",assessmentRoute:"/eligibility/performance"},
  {slug:"sexual-health",name:"Sexual Health",intro:"Private protocol education related to sexual wellness and hormone-linked concerns, subject to provider evaluation.",assessmentRoute:"/eligibility/sexual-health"},
  {slug:"hair-restoration",name:"Hair Restoration",intro:"Protocol education relevant to hair and scalp goals, with treatment availability determined through provider review.",assessmentRoute:"/eligibility/hair-restoration"},
  {slug:"skin-regeneration",name:"Skin Regeneration",intro:"Protocol education related to skin quality, recovery and regenerative goals, without guaranteeing treatment availability.",assessmentRoute:"/eligibility/skin-restoration"},
];

// BioPivot master-list inventory captured for Rejuvonix protocol architecture.
// FDA-approved finished drug products use official prescribing information; a COA is not required for that pathway.
// Non-FDA BioPivot COAs may be imported only after the exact BioPivot item/document relationship is independently verified.
// When imported, preserve the original BioPivot source URL and a local immutable copy so the certificate remains traceable.
export const protocols: ProtocolItem[] = [
  {
    "slug": "semaglutide",
    "name": "Semaglutide",
    "sourceCategory": "Metabolic / body composition",
    "goals": [
      "weight-loss"
    ],
    "summary": "GLP-1 receptor agonist education for provider-led weight-management pathways.",
    "discussionPoints": [
      "Whether the intended pathway uses an FDA-approved semaglutide product",
      "Medical history, current medications and contraindication screening",
      "Monitoring needs, adverse-effect history and alternatives"
    ],
    "regulatoryNote": "FDA-approved semaglutide products exist for specific labeled indications. A separately compounded semaglutide product is not FDA approved and requires its own clinical and source review.",
    "compoundedContext": "possible",
    "approval": {
      "status": "fda-approved",
      "label": "FDA-approved products available",
      "approvedUse": "FDA-approved semaglutide products include Wegovy for labeled weight-management and related indications; product-specific labeling controls."
    },
    "clinical": {
      "overview": "Semaglutide is a prescription GLP-1 receptor agonist. Rejuvonix presents the protocol as education that must resolve to a specific product and labeled or provider-determined use.",
      "mechanism": "It activates the GLP-1 receptor, affecting appetite and satiety signaling, gastric emptying and glucose-dependent insulin pathways.",
      "evidenceContext": "Semaglutide has substantial randomized-trial evidence in its FDA-approved product indications. Evidence for an approved branded product should not be used to imply that a compounded product is FDA approved or clinically interchangeable.",
      "safetyPoints": [
        "Review thyroid C-cell tumor/MEN2 contraindication language in the selected product label",
        "Pregnancy and reproductive planning require provider review",
        "GI, gallbladder, pancreatic, renal and medication-history considerations may affect candidacy"
      ]
    },
    "documentation": {
      "status": "official-documentation",
      "label": "Wegovy prescribing information",
      "url": "https://www.novo-pi.com/wegovy.pdf",
      "source": "Novo Nordisk prescribing information"
    },
    "bioPivotCoa": {
      "status": "not-required",
      "note": "COA is not required for the FDA-approved finished drug product pathway. Any separately compounded formulation would require its own source documentation."
    },
    "references": [
      {
        "label": "Wegovy prescribing information",
        "url": "https://www.novo-pi.com/wegovy.pdf",
        "kind": "official-label"
      },
      {
        "label": "FDA compounding Q&A",
        "url": "https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers",
        "kind": "fda-regulatory"
      }
    ]
  },
  {
    "slug": "tirzepatide",
    "name": "Tirzepatide",
    "sourceCategory": "Metabolic / body composition",
    "goals": [
      "weight-loss"
    ],
    "summary": "Dual GIP/GLP-1 receptor agonist education for provider-led weight-management pathways.",
    "discussionPoints": [
      "Whether the intended pathway uses an FDA-approved tirzepatide product",
      "Medical history, current medications and contraindication screening",
      "Monitoring needs, tolerability and alternative treatment options"
    ],
    "regulatoryNote": "FDA-approved tirzepatide products exist for specific labeled indications. A separately compounded tirzepatide product is not FDA approved and requires its own clinical and source review.",
    "compoundedContext": "possible",
    "approval": {
      "status": "fda-approved",
      "label": "FDA-approved products available",
      "approvedUse": "Zepbound is an FDA-approved tirzepatide product for labeled chronic weight-management and related indications; product-specific labeling controls."
    },
    "clinical": {
      "overview": "Tirzepatide is a prescription dual incretin receptor agonist. Protocol education must distinguish an FDA-approved finished product from any separately compounded formulation.",
      "mechanism": "It activates GIP and GLP-1 receptors, influencing appetite, glucose-dependent insulin secretion and other metabolic signaling.",
      "evidenceContext": "Tirzepatide has randomized-trial evidence supporting FDA-approved product indications. That evidence does not convert a compounded product into an FDA-approved drug.",
      "safetyPoints": [
        "Review thyroid C-cell tumor/MEN2 contraindication language in the selected product label",
        "Pregnancy and reproductive planning require provider review",
        "GI, gallbladder, pancreatic, renal and medication-history considerations may affect candidacy"
      ]
    },
    "documentation": {
      "status": "official-documentation",
      "label": "Zepbound prescribing information",
      "url": "https://pi.lilly.com/us/zepbound-uspi.pdf",
      "source": "Eli Lilly prescribing information"
    },
    "bioPivotCoa": {
      "status": "not-required",
      "note": "COA is not required for the FDA-approved finished drug product pathway. Any separately compounded formulation would require its own source documentation."
    },
    "references": [
      {
        "label": "Zepbound prescribing information",
        "url": "https://pi.lilly.com/us/zepbound-uspi.pdf",
        "kind": "official-label"
      },
      {
        "label": "FDA compounding Q&A",
        "url": "https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers",
        "kind": "fda-regulatory"
      }
    ]
  },
  {
    "slug": "aod-9604",
    "name": "AOD-9604",
    "sourceCategory": "Metabolic / body composition",
    "goals": [
      "weight-loss"
    ],
    "summary": "Metabolic peptide education with explicit evidence, regulatory and source-verification boundaries.",
    "discussionPoints": [
      "Human evidence for the stated metabolic goal",
      "Current U.S. regulatory and compounding status",
      "FDA-approved alternatives with stronger evidence for weight management"
    ],
    "regulatoryNote": "AOD-9604 is not an FDA-approved weight-loss drug. FDA reviewed AOD-9604-related bulk substances in the 2024 Pharmacy Compounding Advisory Committee process.",
    "compoundedContext": "verify",
    "approval": {
      "status": "not-fda-approved",
      "label": "Not FDA approved"
    },
    "clinical": {
      "overview": "AOD-9604 is a synthetic peptide derived from a region of human growth hormone and has been investigated for metabolic effects.",
      "mechanism": "It was designed to explore metabolic signaling associated with a portion of the growth-hormone molecule without presenting it as replacement growth hormone therapy.",
      "evidenceContext": "Human evidence for weight-management use is limited compared with FDA-approved obesity medications. FDA has separately evaluated AOD-9604-related bulk substances in the compounding context.",
      "safetyPoints": [
        "Do not present it as an FDA-approved obesity treatment",
        "Potential immunogenicity, impurities and peptide characterization are part of FDA compounding safety review",
        "Availability must be verified with provider, pharmacy and applicable law before any clinical offer"
      ]
    },
    "documentation": {
      "status": "pending-verification",
      "label": "BioPivot COA relationship not yet verified"
    },
    "bioPivotCoa": {
      "status": "unverified",
      "note": "An exact BioPivot AOD-9604 COA/document relationship could not be independently verified in this pass; no COA URL is displayed."
    },
    "references": [
      {
        "label": "FDA 2024 Pharmacy Compounding Advisory Committee",
        "url": "https://www.fda.gov/advisory-committees/advisory-committee-calendar/updated-meeting-time-and-public-participation-information-december-4-2024-meeting-pharmacy",
        "kind": "fda-regulatory"
      },
      {
        "label": "FDA bulk-substance safety-risk information",
        "url": "https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-may-present-significant-safety-risks",
        "kind": "fda-safety"
      }
    ]
  },
  {
    "slug": "mots-c",
    "name": "MOTS-C",
    "sourceCategory": "Metabolic / body composition",
    "goals": [
      "weight-loss",
      "performance"
    ],
    "summary": "Mitochondrial-derived peptide education for metabolic and performance discussions, with investigational status made explicit.",
    "discussionPoints": [
      "Quality of human evidence for the intended goal",
      "Current health, metabolic and laboratory context",
      "Regulatory and pharmacy availability"
    ],
    "regulatoryNote": "MOTS-C is not FDA approved. FDA reviewed MOTS-C-related bulk substances at the July 2026 Pharmacy Compounding Advisory Committee meeting.",
    "compoundedContext": "verify",
    "approval": {
      "status": "not-fda-approved",
      "label": "Not FDA approved"
    },
    "clinical": {
      "overview": "MOTS-C is a mitochondrial-derived peptide studied as a signaling molecule in metabolism, stress response and cellular adaptation.",
      "mechanism": "Research suggests it participates in metabolic signaling pathways associated with cellular energy handling; the clinical significance for wellness or performance remains investigational.",
      "evidenceContext": "The literature includes preclinical and limited human research, but there is no FDA-approved MOTS-C therapeutic indication. FDA reviewed nominated compounding uses including obesity and osteoporosis in 2026.",
      "safetyPoints": [
        "Do not imply established weight-loss or performance efficacy",
        "FDA compounding review includes peptide-quality and safety considerations",
        "Clinical availability must be independently verified rather than inferred from catalog inclusion"
      ]
    },
    "documentation": {
      "status": "pending-verification",
      "label": "BioPivot COA relationship not yet verified"
    },
    "bioPivotCoa": {
      "status": "unverified",
      "note": "An exact BioPivot MOTS-C COA/document relationship could not be independently verified in this pass; no COA URL is displayed."
    },
    "references": [
      {
        "label": "FDA 2026 Pharmacy Compounding Advisory Committee",
        "url": "https://www.fda.gov/advisory-committees/advisory-committee-calendar/july-23-24-2026-meeting-pharmacy-compounding-advisory-committee-07232026",
        "kind": "fda-regulatory"
      },
      {
        "label": "FDA bulk-substance safety-risk information",
        "url": "https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-may-present-significant-safety-risks",
        "kind": "fda-safety"
      }
    ]
  },
  {
    "slug": "tesamorelin",
    "name": "Tesamorelin",
    "sourceCategory": "Anti-aging / growth hormone",
    "goals": [
      "weight-loss",
      "performance"
    ],
    "summary": "Growth-hormone-releasing factor analog education with the FDA-approved indication clearly separated from general wellness uses.",
    "discussionPoints": [
      "Whether the intended use matches the FDA-approved indication",
      "Malignancy history, glucose status, IGF-1 and relevant laboratory findings",
      "Risks, contraindications and evidence-based alternatives"
    ],
    "regulatoryNote": "Tesamorelin is FDA approved as EGRIFTA WR for a specific labeled indication; that approval does not extend to general weight loss, anti-aging or performance.",
    "compoundedContext": "not-applicable",
    "approval": {
      "status": "fda-approved",
      "label": "FDA approved for a specific indication",
      "approvedUse": "Reduction of excess abdominal fat in HIV-infected adult patients with lipodystrophy, as described in current product labeling."
    },
    "clinical": {
      "overview": "Tesamorelin is a synthetic growth hormone-releasing factor analog used in an FDA-approved finished prescription product for a narrow labeled population.",
      "mechanism": "It binds growth hormone-releasing factor receptors and stimulates pituitary growth-hormone secretion, with downstream effects including IGF-1 signaling.",
      "evidenceContext": "Clinical evidence and approval are indication-specific. Rejuvonix must not present the approved HIV-lipodystrophy indication as proof of benefit for general weight loss or athletic performance.",
      "safetyPoints": [
        "The current FDA label includes important contraindications and warnings that require provider review",
        "IGF-1 and glucose effects may require monitoring in the approved pathway",
        "Use outside the approved indication is not established by the FDA approval"
      ]
    },
    "documentation": {
      "status": "official-documentation",
      "label": "EGRIFTA WR FDA prescribing information",
      "url": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/022505s020lbl.pdf",
      "source": "U.S. FDA"
    },
    "bioPivotCoa": {
      "status": "not-required",
      "note": "COA is not required for the FDA-approved finished EGRIFTA WR product pathway."
    },
    "references": [
      {
        "label": "EGRIFTA WR FDA prescribing information",
        "url": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/022505s020lbl.pdf",
        "kind": "official-label"
      }
    ]
  },
  {
    "slug": "cjc-1295-ipamorelin",
    "name": "CJC-1295 / Ipamorelin",
    "sourceCategory": "Anti-aging / growth hormone",
    "goals": [
      "performance"
    ],
    "summary": "Growth-hormone secretagogue education with FDA safety and compounding context visible before any clinical discussion.",
    "discussionPoints": [
      "Human evidence for the intended recovery/performance goal",
      "Hormonal history and laboratory context",
      "Regulatory status, pharmacy source and monitoring requirements"
    ],
    "regulatoryNote": "CJC-1295 and ipamorelin are not FDA-approved performance therapies. FDA has published compounding safety concerns for these peptide substances.",
    "compoundedContext": "verify",
    "approval": {
      "status": "not-fda-approved",
      "label": "Not FDA approved"
    },
    "clinical": {
      "overview": "CJC-1295 is a growth-hormone-releasing hormone analog; ipamorelin is a growth-hormone secretagogue. They are sometimes discussed together but remain separate active substances with separate evidence and safety questions.",
      "mechanism": "CJC-1295 is designed to stimulate the GHRH receptor pathway, while ipamorelin acts at the ghrelin/growth-hormone secretagogue receptor to stimulate growth-hormone release.",
      "evidenceContext": "There is no FDA-approved CJC-1295/ipamorelin combination for performance or recovery. FDA has reviewed CJC-1295-related bulk substances and separately flagged safety concerns for ipamorelin in the compounding context.",
      "safetyPoints": [
        "Do not infer efficacy from changes in growth-hormone biomarkers alone",
        "FDA notes immunogenicity/impurity concerns for peptide compounding and serious adverse events in an intravenous ipamorelin study",
        "Endocrine evaluation and source verification are essential before any clinical consideration"
      ]
    },
    "documentation": {
      "status": "pending-verification",
      "label": "BioPivot COA relationship not yet verified"
    },
    "bioPivotCoa": {
      "status": "unverified",
      "note": "An exact BioPivot CJC-1295 / Ipamorelin COA/document relationship could not be independently verified in this pass; no COA URL is displayed."
    },
    "references": [
      {
        "label": "FDA 2024 Pharmacy Compounding Advisory Committee",
        "url": "https://www.fda.gov/advisory-committees/advisory-committee-calendar/updated-meeting-time-and-public-participation-information-december-4-2024-meeting-pharmacy",
        "kind": "fda-regulatory"
      },
      {
        "label": "FDA bulk-substance safety-risk information",
        "url": "https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-may-present-significant-safety-risks",
        "kind": "fda-safety"
      }
    ]
  },
  {
    "slug": "sermorelin",
    "name": "Sermorelin",
    "sourceCategory": "Anti-aging / growth hormone",
    "goals": [
      "performance"
    ],
    "summary": "Growth-hormone-releasing hormone analog education with its historical U.S. approval status clearly distinguished from current marketed approval.",
    "discussionPoints": [
      "Reason for endocrine evaluation and symptom context",
      "Relevant laboratory findings and pituitary/endocrine history",
      "Current product status, alternatives and monitoring"
    ],
    "regulatoryNote": "Sermorelin had historical U.S. approved products, but FDA records note those products were discontinued and their approvals withdrawn. Current compounded use should not be presented as a currently marketed FDA-approved drug.",
    "compoundedContext": "verify",
    "approval": {
      "status": "historical-discontinued",
      "label": "Historical FDA approval; discontinued/withdrawn"
    },
    "clinical": {
      "overview": "Sermorelin is a synthetic analog of the growth-hormone-releasing hormone fragment that stimulates the pituitary growth-hormone axis.",
      "mechanism": "It acts at pituitary GHRH receptors to promote endogenous growth-hormone release rather than supplying growth hormone directly.",
      "evidenceContext": "Historical FDA approval does not establish a currently marketed approved sermorelin product. Contemporary wellness/performance use requires separate evidence, regulatory and pharmacy review.",
      "safetyPoints": [
        "Do not display a current FDA-approved badge for compounded sermorelin",
        "Endocrine history and laboratory context should be clinically evaluated",
        "Exact pharmacy/source documentation must be verified for any compounded pathway"
      ]
    },
    "documentation": {
      "status": "pending-verification",
      "label": "BioPivot COA relationship not yet verified"
    },
    "bioPivotCoa": {
      "status": "unverified",
      "note": "An exact BioPivot sermorelin COA/document relationship could not be independently verified in this pass; no COA URL is displayed."
    },
    "references": [
      {
        "label": "FDA review discussing withdrawal of GEREF approvals",
        "url": "https://www.accessdata.fda.gov/drugsatfda_docs/nda/2017/205598Orig1s000MedR.pdf",
        "kind": "fda-regulatory"
      }
    ]
  },
  {
    "slug": "epithalon",
    "name": "Epithalon",
    "sourceCategory": "Anti-aging / growth hormone",
    "goals": [
      "performance",
      "skin-regeneration"
    ],
    "summary": "Longevity-oriented peptide education with limited human evidence and current U.S. compounding review made explicit.",
    "discussionPoints": [
      "Strength and reproducibility of human clinical evidence",
      "Regulatory and pharmacy availability",
      "Evidence-based alternatives for sleep, skin or longevity goals"
    ],
    "regulatoryNote": "Epitalon/Epithalon is not FDA approved. FDA reviewed Epitalon-related bulk substances at the July 2026 Pharmacy Compounding Advisory Committee meeting.",
    "compoundedContext": "verify",
    "approval": {
      "status": "not-fda-approved",
      "label": "Not FDA approved"
    },
    "clinical": {
      "overview": "Epithalon (Epitalon) is a synthetic tetrapeptide promoted in longevity contexts, but its clinical evidence base is limited and it is not an FDA-approved therapy.",
      "mechanism": "Proposed mechanisms in the literature include effects on cellular aging pathways, but these hypotheses have not translated into an FDA-approved indication.",
      "evidenceContext": "FDA reviewed Epitalon-related bulk substances in 2026 for a nominated insomnia use. That review does not constitute approval or confirmation of efficacy.",
      "safetyPoints": [
        "Do not make anti-aging or lifespan-extension claims",
        "FDA compounding review includes peptide characterization and immunogenicity considerations",
        "Clinical availability must be verified independently of marketing claims"
      ]
    },
    "documentation": {
      "status": "pending-verification",
      "label": "BioPivot COA relationship not yet verified"
    },
    "bioPivotCoa": {
      "status": "unverified",
      "note": "An exact BioPivot Epithalon COA/document relationship could not be independently verified in this pass; no COA URL is displayed."
    },
    "references": [
      {
        "label": "FDA 2026 Pharmacy Compounding Advisory Committee",
        "url": "https://www.fda.gov/advisory-committees/advisory-committee-calendar/july-23-24-2026-meeting-pharmacy-compounding-advisory-committee-07232026",
        "kind": "fda-regulatory"
      },
      {
        "label": "FDA bulk-substance safety-risk information",
        "url": "https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-may-present-significant-safety-risks",
        "kind": "fda-safety"
      }
    ]
  },
  {
    "slug": "ghk-cu",
    "name": "GHK-Cu",
    "sourceCategory": "Recovery / tissue repair",
    "goals": [
      "hair-restoration",
      "skin-regeneration"
    ],
    "summary": "Copper-peptide education that separates topical/cosmetic discussion from injectable compounded-drug risk.",
    "discussionPoints": [
      "Topical versus injectable or other formulation",
      "Skin/scalp history, sensitivities and intended goal",
      "Evidence, formulation quality and source documentation"
    ],
    "regulatoryNote": "Regulatory status depends heavily on formulation and intended use. FDA specifically lists safety concerns for compounded injectable GHK-Cu; topical cosmetic use is a different context.",
    "compoundedContext": "verify",
    "approval": {
      "status": "route-dependent",
      "label": "Status depends on formulation and route"
    },
    "clinical": {
      "overview": "GHK-Cu is a naturally occurring copper-binding tripeptide that has been studied in skin, wound and hair-related contexts.",
      "mechanism": "The peptide binds copper and has been studied for effects on extracellular-matrix and tissue-remodeling signaling. Route and formulation materially change the clinical and regulatory question.",
      "evidenceContext": "Topical/cosmetic literature cannot be used to establish safety or effectiveness of an injectable compounded drug. FDA specifically identifies limited human safety data and peptide-quality concerns for injectable GHK-Cu.",
      "safetyPoints": [
        "Route must be identified before discussing risk or evidence",
        "Injectable compounded GHK-Cu carries FDA-identified immunogenicity/impurity concerns",
        "Skin or scalp conditions may require dermatologic evaluation before treatment selection"
      ]
    },
    "documentation": {
      "status": "pending-verification",
      "label": "BioPivot COA relationship not yet verified"
    },
    "bioPivotCoa": {
      "status": "unverified",
      "note": "An exact BioPivot GHK-Cu COA/document relationship could not be independently verified in this pass; no COA URL is displayed."
    },
    "references": [
      {
        "label": "FDA bulk-substance safety-risk information",
        "url": "https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-may-present-significant-safety-risks",
        "kind": "fda-safety"
      }
    ]
  },
  {
    "slug": "bpc-157",
    "name": "BPC-157",
    "sourceCategory": "Recovery / tissue repair",
    "goals": [
      "performance",
      "skin-regeneration"
    ],
    "summary": "Recovery-oriented peptide education with the limited human evidence base and FDA compounding concerns placed up front.",
    "discussionPoints": [
      "Quality of human evidence for the specific injury/recovery goal",
      "FDA safety concerns and current compounding status",
      "Evidence-based rehabilitation or approved alternatives"
    ],
    "regulatoryNote": "BPC-157 is not FDA approved for human therapeutic use. FDA reviewed BPC-157-related bulk substances at the July 2026 Pharmacy Compounding Advisory Committee meeting.",
    "compoundedContext": "verify",
    "approval": {
      "status": "not-fda-approved",
      "label": "Not FDA approved"
    },
    "clinical": {
      "overview": "BPC-157 is a synthetic peptide widely promoted for tissue-repair and gastrointestinal recovery, but much of the supporting evidence is preclinical.",
      "mechanism": "Proposed mechanisms include effects on vascular, inflammatory and tissue-repair signaling; these proposed mechanisms do not establish clinical effectiveness in humans.",
      "evidenceContext": "Human evidence remains limited, and FDA has highlighted immunogenicity, impurity and active-ingredient characterization concerns in the compounding context.",
      "safetyPoints": [
        "Do not describe animal or laboratory findings as proven human benefits",
        "Unresolved peptide-quality and immunogenicity issues are relevant to compounded use",
        "Injury, pain or GI symptoms should be evaluated for established diagnoses and treatments"
      ]
    },
    "documentation": {
      "status": "pending-verification",
      "label": "BioPivot COA relationship not yet verified"
    },
    "bioPivotCoa": {
      "status": "unverified",
      "note": "An exact BioPivot BPC-157 COA/document relationship could not be independently verified in this pass; no COA URL is displayed."
    },
    "references": [
      {
        "label": "FDA 2026 Pharmacy Compounding Advisory Committee",
        "url": "https://www.fda.gov/advisory-committees/advisory-committee-calendar/july-23-24-2026-meeting-pharmacy-compounding-advisory-committee-07232026",
        "kind": "fda-regulatory"
      },
      {
        "label": "FDA bulk-substance safety-risk information",
        "url": "https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-may-present-significant-safety-risks",
        "kind": "fda-safety"
      }
    ]
  },
  {
    "slug": "tb-500",
    "name": "TB-500",
    "sourceCategory": "Recovery / tissue repair",
    "goals": [
      "performance",
      "skin-regeneration"
    ],
    "summary": "Tissue-repair peptide education with investigational status and 2026 FDA compounding review clearly identified.",
    "discussionPoints": [
      "Human clinical evidence for the specific recovery goal",
      "Exact identity/formulation and regulatory status",
      "Established treatment alternatives and rehabilitation needs"
    ],
    "regulatoryNote": "TB-500 is not an FDA-approved human therapeutic product. FDA reviewed TB-500-related bulk substances for a nominated wound-healing use in July 2026.",
    "compoundedContext": "verify",
    "approval": {
      "status": "not-fda-approved",
      "label": "Not FDA approved"
    },
    "clinical": {
      "overview": "TB-500 is a synthetic peptide associated with thymosin beta-4-related research and is commonly marketed for tissue recovery.",
      "mechanism": "Research discussions focus on actin-binding and tissue-repair biology associated with thymosin beta-4 pathways, but marketed TB-500 preparations and human therapeutic claims require separate verification.",
      "evidenceContext": "FDA reviewed TB-500-related bulk substances in 2026 for wound healing. Advisory review is not approval, and clinical evidence for broad performance/recovery use remains insufficient for an approved indication.",
      "safetyPoints": [
        "Do not equate thymosin beta-4 biology with proven efficacy of a marketed TB-500 product",
        "Exact active ingredient and source documentation matter",
        "Wounds or musculoskeletal injuries require appropriate clinical evaluation"
      ]
    },
    "documentation": {
      "status": "pending-verification",
      "label": "BioPivot COA relationship not yet verified"
    },
    "bioPivotCoa": {
      "status": "unverified",
      "note": "An exact BioPivot TB-500 COA/document relationship could not be independently verified in this pass; no COA URL is displayed."
    },
    "references": [
      {
        "label": "FDA 2026 Pharmacy Compounding Advisory Committee",
        "url": "https://www.fda.gov/advisory-committees/advisory-committee-calendar/july-23-24-2026-meeting-pharmacy-compounding-advisory-committee-07232026",
        "kind": "fda-regulatory"
      }
    ]
  },
  {
    "slug": "ss-31",
    "name": "SS-31 / Elamipretide",
    "sourceCategory": "Recovery / tissue repair",
    "goals": [
      "performance"
    ],
    "summary": "Mitochondrial-targeted peptide education that recognizes the current FDA-approved elamipretide product while preventing indication drift into general performance.",
    "discussionPoints": [
      "Whether the clinical question relates to the FDA-approved Barth syndrome indication",
      "Diagnosis, product identity and specialist context",
      "Why general performance use is not established by the approval"
    ],
    "regulatoryNote": "Elamipretide is FDA approved as Forzinity under accelerated approval for a specific Barth syndrome indication. That approval does not establish a general performance, recovery or wellness indication.",
    "compoundedContext": "not-applicable",
    "approval": {
      "status": "fda-approved",
      "label": "FDA approved for a specific indication",
      "approvedUse": "Forzinity (elamipretide) is FDA approved under accelerated approval to improve muscle strength in adult and pediatric patients with Barth syndrome weighing at least 30 kg."
    },
    "clinical": {
      "overview": "SS-31 is the research name commonly associated with elamipretide, a mitochondria-targeted peptide now present in an FDA-approved finished drug product for Barth syndrome.",
      "mechanism": "Elamipretide binds mitochondrial cardiolipin and is intended to improve mitochondrial structure/function in its approved disease context.",
      "evidenceContext": "The FDA approval is narrow and based on the Barth syndrome development program. It should not be generalized to athletic performance, fatigue treatment or wellness use.",
      "safetyPoints": [
        "Confirm product identity: research-name SS-31 should not be treated as equivalent to an unverified compounded preparation",
        "The approved indication is Barth syndrome, not general performance",
        "Use current Forzinity labeling and specialist/provider judgment for the approved product"
      ]
    },
    "documentation": {
      "status": "official-documentation",
      "label": "Forzinity FDA prescribing information",
      "url": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215244s000lbl.pdf",
      "source": "U.S. FDA"
    },
    "bioPivotCoa": {
      "status": "not-required",
      "note": "COA is not required for the FDA-approved finished Forzinity product pathway."
    },
    "references": [
      {
        "label": "Forzinity FDA prescribing information",
        "url": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215244s000lbl.pdf",
        "kind": "official-label"
      },
      {
        "label": "FDA accelerated approval announcement",
        "url": "https://www.fda.gov/news-events/press-announcements/fda-grants-accelerated-approval-first-treatment-barth-syndrome",
        "kind": "fda-approval"
      }
    ]
  },
  {
    "slug": "thymosin-alpha-1",
    "name": "Thymosin Alpha-1",
    "sourceCategory": "Immune / inflammation",
    "goals": [
      "performance"
    ],
    "summary": "Immune-modulation peptide education with U.S. nonapproval and FDA compounding review clearly disclosed.",
    "discussionPoints": [
      "Reason for immune-focused evaluation and underlying diagnosis",
      "Quality of evidence for the intended use",
      "FDA-approved alternatives and current pharmacy/regulatory status"
    ],
    "regulatoryNote": "Thymosin Alpha-1 is not an FDA-approved U.S. therapy. FDA reviewed thymosin alpha-1-related bulk substances at the December 2024 Pharmacy Compounding Advisory Committee meeting.",
    "compoundedContext": "verify",
    "approval": {
      "status": "not-fda-approved",
      "label": "Not FDA approved in the U.S."
    },
    "clinical": {
      "overview": "Thymosin Alpha-1 is a peptide involved in immune signaling and has been studied or used in some countries for selected infectious, immune and oncology contexts.",
      "mechanism": "It is studied as an immune-modulating peptide affecting T-cell and innate immune signaling, but mechanistic plausibility does not establish an FDA-approved U.S. indication.",
      "evidenceContext": "FDA reviewed multiple nominated uses in the 2024 compounding advisory process. That process is not approval and should not be presented as endorsement for resilience or performance.",
      "safetyPoints": [
        "Immune symptoms can reflect serious underlying disease and require diagnostic evaluation",
        "Do not claim broad immune boosting or infection prevention",
        "Source, indication and compounding legality must be verified before any clinical offer"
      ]
    },
    "documentation": {
      "status": "pending-verification",
      "label": "BioPivot COA relationship not yet verified"
    },
    "bioPivotCoa": {
      "status": "unverified",
      "note": "An exact BioPivot Thymosin Alpha-1 COA/document relationship could not be independently verified in this pass; no COA URL is displayed."
    },
    "references": [
      {
        "label": "FDA 2024 Pharmacy Compounding Advisory Committee",
        "url": "https://www.fda.gov/advisory-committees/advisory-committee-calendar/updated-meeting-time-and-public-participation-information-december-4-2024-meeting-pharmacy",
        "kind": "fda-regulatory"
      }
    ]
  },
  {
    "slug": "glutathione",
    "name": "Glutathione",
    "sourceCategory": "Immune / inflammation",
    "goals": [
      "performance",
      "skin-regeneration"
    ],
    "summary": "Glutathione education separated by route, with current FDA injectable-compounding alerts displayed where relevant.",
    "discussionPoints": [
      "Goal, formulation and route under consideration",
      "Evidence for the specific use rather than general antioxidant claims",
      "Source quality and current safety alerts for sterile compounded products"
    ],
    "regulatoryNote": "Glutathione is not an FDA-approved injectable wellness or skin-regeneration treatment. FDA issued an August 27, 2026 alert regarding dietary-supplement-grade glutathione used in compounded injectables and reports of adverse events consistent with endotoxin exposure.",
    "compoundedContext": "verify",
    "approval": {
      "status": "route-dependent",
      "label": "Status and risk depend on formulation and route"
    },
    "clinical": {
      "overview": "Glutathione is an endogenous tripeptide antioxidant. Oral, topical and injectable products are distinct clinical and regulatory contexts.",
      "mechanism": "It participates in cellular redox chemistry and antioxidant defense. That biological role alone does not establish clinical benefit for an injectable wellness or skin protocol.",
      "evidenceContext": "Evidence varies by indication and route. FDA has recently reported adverse events and recalls involving compounded injectable glutathione associated with inappropriate ingredient grade or elevated endotoxin.",
      "safetyPoints": [
        "Route must be explicit before discussing expected effects or risk",
        "Sterile compounded injectable products require drug-grade ingredients and appropriate quality controls",
        "Current FDA alerts/recalls should be reviewed before any injectable pathway is considered"
      ]
    },
    "documentation": {
      "status": "pending-verification",
      "label": "BioPivot COA relationship not yet verified; current FDA safety documentation available"
    },
    "bioPivotCoa": {
      "status": "unverified",
      "note": "An exact BioPivot glutathione COA/document relationship could not be independently verified in this pass; no COA URL is displayed."
    },
    "references": [
      {
        "label": "FDA Aug. 27, 2026 glutathione compounding alert",
        "url": "https://www.fda.gov/drugs/human-drug-compounding/fda-reminds-compounders-not-use-dietary-supplement-grade-glutathione-injectables",
        "kind": "fda-safety"
      },
      {
        "label": "FDA drug recalls",
        "url": "https://www.fda.gov/drugs/drug-safety-and-availability/drug-recalls",
        "kind": "fda-safety"
      }
    ]
  },
  {
    "slug": "semax-selank",
    "name": "Semax / Selank",
    "sourceCategory": "Cognitive / neurological",
    "goals": [
      "performance"
    ],
    "summary": "Cognitive/stress peptide education with nonapproval and FDA peptide-safety context explicit.",
    "discussionPoints": [
      "Symptoms that need standard neurologic, psychiatric or sleep evaluation",
      "Evidence quality for the intended cognitive/stress goal",
      "U.S. regulatory status, interactions and approved alternatives"
    ],
    "regulatoryNote": "Semax and Selank are not FDA-approved U.S. therapies. FDA has published compounding safety concerns for these peptide substances, and Semax-related bulk substances were reviewed at the July 2026 advisory committee meeting.",
    "compoundedContext": "verify",
    "approval": {
      "status": "not-fda-approved",
      "label": "Not FDA approved"
    },
    "clinical": {
      "overview": "Semax and Selank are synthetic neuroactive peptides studied or used outside the United States for neurologic, cognitive or anxiety-related contexts.",
      "mechanism": "Proposed mechanisms involve neurotrophic, neurotransmitter and stress-response pathways, but these remain investigational in the U.S. clinical context.",
      "evidenceContext": "There is no FDA-approved Semax/Selank treatment for cognitive enhancement or performance. FDA has flagged peptide-quality/immunogenicity concerns and reviewed Semax-related bulk substances in 2026.",
      "safetyPoints": [
        "Do not market as proven nootropic or anxiety treatment",
        "New cognitive, mood or neurologic symptoms warrant appropriate diagnostic evaluation",
        "Potential drug interactions and product quality are not resolved by catalog inclusion"
      ]
    },
    "documentation": {
      "status": "pending-verification",
      "label": "BioPivot COA relationship not yet verified"
    },
    "bioPivotCoa": {
      "status": "unverified",
      "note": "An exact BioPivot Semax / Selank COA/document relationship could not be independently verified in this pass; no COA URL is displayed."
    },
    "references": [
      {
        "label": "FDA 2026 Pharmacy Compounding Advisory Committee",
        "url": "https://www.fda.gov/advisory-committees/advisory-committee-calendar/july-23-24-2026-meeting-pharmacy-compounding-advisory-committee-07232026",
        "kind": "fda-regulatory"
      },
      {
        "label": "FDA bulk-substance safety-risk information",
        "url": "https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-may-present-significant-safety-risks",
        "kind": "fda-safety"
      }
    ]
  },
  {
    "slug": "dsip",
    "name": "DSIP / Emideltide",
    "sourceCategory": "Cognitive / neurological",
    "goals": [
      "performance"
    ],
    "summary": "Sleep-related peptide education with limited evidence and 2026 FDA compounding review visible.",
    "discussionPoints": [
      "Sleep symptoms, duration and underlying causes",
      "Quality of evidence for DSIP/emideltide",
      "Evidence-based sleep evaluation and treatment alternatives"
    ],
    "regulatoryNote": "DSIP/emideltide is not FDA approved. FDA reviewed emideltide-related bulk substances for nominated uses including chronic insomnia at the July 2026 Pharmacy Compounding Advisory Committee meeting.",
    "compoundedContext": "verify",
    "approval": {
      "status": "not-fda-approved",
      "label": "Not FDA approved"
    },
    "clinical": {
      "overview": "Delta sleep-inducing peptide (DSIP), also called emideltide in FDA compounding materials, is an investigational peptide discussed in sleep-related contexts.",
      "mechanism": "Proposed neuroendocrine and sleep-regulatory effects have been studied, but a clinically established mechanism supporting an approved sleep indication has not been demonstrated.",
      "evidenceContext": "FDA reviewed nominated uses including opioid withdrawal, chronic insomnia and narcolepsy in 2026. Advisory review is not approval and does not establish efficacy.",
      "safetyPoints": [
        "Sleep disturbance may reflect sleep apnea, medication effects, mood disorders or other treatable causes",
        "Do not present DSIP as an FDA-approved insomnia therapy",
        "Product quality and legal availability require independent verification"
      ]
    },
    "documentation": {
      "status": "pending-verification",
      "label": "BioPivot COA relationship not yet verified"
    },
    "bioPivotCoa": {
      "status": "unverified",
      "note": "An exact BioPivot DSIP COA/document relationship could not be independently verified in this pass; no COA URL is displayed."
    },
    "references": [
      {
        "label": "FDA 2026 Pharmacy Compounding Advisory Committee",
        "url": "https://www.fda.gov/advisory-committees/advisory-committee-calendar/july-23-24-2026-meeting-pharmacy-compounding-advisory-committee-07232026",
        "kind": "fda-regulatory"
      },
      {
        "label": "FDA bulk-substance safety-risk information",
        "url": "https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-may-present-significant-safety-risks",
        "kind": "fda-safety"
      }
    ]
  },
  {
    "slug": "nad-plus",
    "name": "NAD+",
    "sourceCategory": "Cognitive / neurological",
    "goals": [
      "performance"
    ],
    "summary": "NAD+ protocol education focused on route-specific evidence and sterile-compounding quality rather than generalized energy claims.",
    "discussionPoints": [
      "Goal and symptoms prompting interest",
      "Route/formulation and strength of evidence",
      "Current medication, medical history and safer evidence-based alternatives"
    ],
    "regulatoryNote": "There is no FDA-approved NAD+ injectable wellness/performance indication. FDA has received adverse event reports after NAD+ injectable drugs consistent with excessive endotoxin exposure and has reminded compounders to use ingredients suitable for sterile compounding.",
    "compoundedContext": "verify",
    "approval": {
      "status": "route-dependent",
      "label": "No FDA-approved injectable wellness indication"
    },
    "clinical": {
      "overview": "NAD+ is a naturally occurring cellular coenzyme essential to oxidation-reduction reactions and energy metabolism.",
      "mechanism": "Its central biochemical role in cellular redox reactions is established, but that does not by itself demonstrate clinical benefit from intravenous or other NAD+ wellness administration.",
      "evidenceContext": "Evidence for injectable NAD+ wellness/performance use is limited, and FDA has reported adverse events associated with compounded NAD+ injectables that were consistent with excessive endotoxin.",
      "safetyPoints": [
        "Do not equate a normal cellular role with proven benefit from an injectable product",
        "Sterile-compounding ingredient suitability and endotoxin control are material safety issues",
        "Fatigue or cognitive symptoms may require evaluation for underlying causes"
      ]
    },
    "documentation": {
      "status": "pending-verification",
      "label": "BioPivot COA relationship not yet verified; current FDA sterile-compounding safety documentation available"
    },
    "bioPivotCoa": {
      "status": "unverified",
      "note": "An exact BioPivot NAD+ COA/document relationship could not be independently verified in this pass; no COA URL is displayed."
    },
    "references": [
      {
        "label": "FDA sterile-compounding ingredient safety reminder",
        "url": "https://www.fda.gov/drugs/human-drug-compounding/fda-reminds-compounders-use-ingredients-suitable-sterile-compounding",
        "kind": "fda-safety"
      }
    ]
  },
  {
    "slug": "pt-141",
    "name": "PT-141 / Bremelanotide",
    "sourceCategory": "Sexual health / hormones",
    "goals": [
      "sexual-health"
    ],
    "summary": "Sexual-health peptide education anchored to the FDA-approved bremelanotide product and its narrow labeled population.",
    "discussionPoints": [
      "Whether the person fits the FDA-approved HSDD population",
      "Cardiovascular history, blood pressure and medication review",
      "Whether symptoms may have another medical, psychiatric, relationship or medication-related cause"
    ],
    "regulatoryNote": "Bremelanotide is FDA approved as Vyleesi for acquired, generalized HSDD in certain premenopausal women. It is not approved for men, postmenopausal women or to enhance sexual performance.",
    "compoundedContext": "not-applicable",
    "approval": {
      "status": "fda-approved",
      "label": "FDA approved for a specific indication",
      "approvedUse": "Vyleesi (bremelanotide) is FDA approved for premenopausal women with acquired, generalized hypoactive sexual desire disorder meeting the label criteria."
    },
    "clinical": {
      "overview": "Bremelanotide is a melanocortin receptor agonist used in an FDA-approved finished prescription product for a specific sexual-health indication.",
      "mechanism": "It activates melanocortin receptors involved in central nervous system pathways related to sexual desire.",
      "evidenceContext": "Evidence and approval apply to the labeled HSDD population. The approval should not be generalized to sexual performance enhancement or populations excluded by the label.",
      "safetyPoints": [
        "The label contraindicates use with uncontrolled hypertension or known cardiovascular disease",
        "Blood-pressure/heart-rate effects, nausea and hyperpigmentation are important label considerations",
        "The approved product is not indicated simply to enhance sexual performance"
      ]
    },
    "documentation": {
      "status": "official-documentation",
      "label": "Vyleesi prescribing information",
      "url": "https://vyleesi.com/docs/Vyleesi-Full-Prescribing-Information.pdf",
      "source": "Vyleesi prescribing information"
    },
    "bioPivotCoa": {
      "status": "not-required",
      "note": "COA is not required for the FDA-approved finished Vyleesi product pathway."
    },
    "references": [
      {
        "label": "Vyleesi full prescribing information",
        "url": "https://vyleesi.com/docs/Vyleesi-Full-Prescribing-Information.pdf",
        "kind": "official-label"
      }
    ]
  },
  {
    "slug": "gonadorelin",
    "name": "Gonadorelin",
    "sourceCategory": "Sexual health / hormones",
    "goals": [
      "sexual-health",
      "performance"
    ],
    "summary": "GnRH analog education with historical human-product status separated from current performance/hormone marketing.",
    "discussionPoints": [
      "Reason for hypothalamic-pituitary-gonadal evaluation",
      "Relevant LH/FSH, sex-hormone and medical-history context",
      "Current product availability, alternatives and monitoring"
    ],
    "regulatoryNote": "Human gonadorelin products have historical FDA approvals but current FDA records list prior products as discontinued. Category placement does not establish a current FDA-approved performance or hormone-optimization indication.",
    "compoundedContext": "verify",
    "approval": {
      "status": "historical-discontinued",
      "label": "Historical FDA-approved human products; discontinued"
    },
    "clinical": {
      "overview": "Gonadorelin is synthetic gonadotropin-releasing hormone (GnRH), historically used in diagnostic and reproductive-endocrine contexts.",
      "mechanism": "It stimulates pituitary GnRH receptors, causing release of luteinizing hormone and follicle-stimulating hormone.",
      "evidenceContext": "Historical approval should not be represented as a currently marketed FDA-approved performance product. Any current compounded pathway requires separate legal, pharmacy and clinical verification.",
      "safetyPoints": [
        "Hormone symptoms require diagnosis rather than protocol selection from a catalog alone",
        "Current human product/source status must be verified",
        "Do not confuse human gonadorelin history with veterinary gonadorelin products"
      ]
    },
    "documentation": {
      "status": "pending-verification",
      "label": "BioPivot COA relationship not yet verified"
    },
    "bioPivotCoa": {
      "status": "unverified",
      "note": "An exact BioPivot gonadorelin COA/document relationship could not be independently verified in this pass; no COA URL is displayed."
    },
    "references": [
      {
        "label": "FDA Orange Book discontinued drug product list",
        "url": "https://www.fda.gov/downloads/drugs/developmentapprovalprocess/UCM071436.pdf",
        "kind": "fda-regulatory"
      }
    ]
  }
];

export const findProtocol = (slug:string) => protocols.find((protocol) => protocol.slug === slug);
export const findProtocolGoal = (slug:string) => protocolGoals.find((goal) => goal.slug === slug);
export const protocolsForGoal = (goal:RejuvonixGoal) => protocols.filter((protocol) => protocol.goals.includes(goal));
