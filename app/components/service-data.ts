export type ServiceItem = { slug: string; name: string; note: string };
export type GoalGroup = { slug: string; name: string; intro: string; services: ServiceItem[] };

export const goalGroups: GoalGroup[] = [
  { slug:"weight-loss", name:"Weight Loss", intro:"Provider-guided pathways for sustainable weight care and metabolic health.", services:[
    {slug:"glp-1-injections",name:"GLP-1 Injections",note:"Explore patient-specific compounded injectable options with provider review."},
    {slug:"glp-1-tablets",name:"GLP-1 Tablets",note:"Explore patient-specific compounded oral options with provider review."},
    {slug:"wegovy-pill",name:"Wegovy® Pill",note:"Learn about the FDA-approved once-daily oral GLP-1 option."},
    {slug:"wegovy-injection",name:"Wegovy® Injection",note:"A once-weekly branded semaglutide injection for eligible patients."},
    {slug:"zepbound-injection",name:"Zepbound® Injection",note:"A once-weekly branded tirzepatide injection for eligible patients."},
  ]},
  { slug:"hormone-health", name:"Hormone Health", intro:"Private online support for changing energy, mood, body composition and sexual wellness.", services:[
    {slug:"womens-hormone-health",name:"Women’s Hormone Health",note:"Personalized evaluation for symptoms that may change across life stages."},
    {slug:"mens-hormone-health",name:"Men’s Hormone Health",note:"Provider-guided evaluation centered on energy, strength and wellbeing."},
  ]},
  { slug:"energy-metabolism", name:"Energy & Metabolism", intro:"Explore supportive options for cellular energy and everyday metabolic resilience.", services:[
    {slug:"nad-plus",name:"NAD+",note:"Explore provider-guided NAD+ wellness options."},{slug:"b12",name:"B12",note:"Support for appropriate patients with assessed B12 needs."},{slug:"lipotropic",name:"Lipotropic",note:"Learn about ingredients commonly used in metabolic wellness programs."},{slug:"multi-v",name:"Multi-V",note:"A broad-spectrum daily nutrition option."},{slug:"vitamin-d3-k2",name:"Vitamin D3 + K2",note:"Targeted support for vitamin D and bone-health routines."},{slug:"greens",name:"Greens+",note:"A convenient whole-food nutrition complement."},{slug:"berberine",name:"Berberine",note:"A botanical option often explored for metabolic wellness."}, {slug:"fiber",name:"Fiber",note:"Daily digestive and metabolic support."},
  ]},
  { slug:"sleep-stress", name:"Sleep & Stress", intro:"Build a calmer evening routine and a stronger foundation for recovery.", services:[
    {slug:"sermorelin",name:"Sermorelin",note:"A prescription peptide conversation requiring provider evaluation."},{slug:"magnesium",name:"Magnesium+",note:"Mineral support for relaxation and recovery routines."},{slug:"glycine",name:"Glycine",note:"An amino acid commonly included in nighttime wellness routines."},
  ]},
  { slug:"body-composition", name:"Body Composition", intro:"Support strength, lean mass and recovery alongside movement and nutrition.", services:[
    {slug:"protein-powder",name:"Protein Powder",note:"Convenient protein support for daily nutrition goals."},{slug:"creatine",name:"Creatine",note:"Evidence-informed support for strength and performance routines."},{slug:"amino",name:"Amino+",note:"Essential amino acid support for active lifestyles."},
  ]},
  { slug:"immune-repair", name:"Immune & Repair", intro:"Foundational support for recovery, gut health, hydration and resilience.", services:[
    {slug:"colostrum-complex",name:"Colostrum Complex",note:"Nutrition support for gut and immune wellness."},{slug:"akkermansia",name:"Akkermansia+",note:"A microbiome-focused wellness option."},{slug:"electrolyte-blend",name:"Electrolyte Blend",note:"Hydration support for active days and recovery."},{slug:"hepatic",name:"Hepatic",note:"A liver-support supplement pathway."},
  ]},
  { slug:"longevity-skin", name:"Longevity & Skin", intro:"Thoughtful options for healthy aging, hair and naturally radiant skin.", services:[
    {slug:"collagen",name:"Collagen+",note:"Daily support for skin, hair and connective tissue."},{slug:"krill",name:"Krill",note:"Omega-3 support for whole-body wellness."},{slug:"renu-nmn",name:"Renu NMN",note:"A cellular-energy supplement for longevity-focused routines."},{slug:"cu-hair-spray",name:"Cu Hair Spray",note:"A topical copper-peptide hair wellness option."},{slug:"cu-skin-cream",name:"Cu Skin Cream",note:"A topical copper-peptide skin wellness option."},
  ]},
];

export const approvedGoalGroups = goalGroups.filter((group) =>
  ["weight-loss", "longevity-skin"].includes(group.slug),
);

export const allServices = goalGroups.flatMap((group) => group.services.map((service) => ({...service, group})));
export const findGoal = (slug:string) => goalGroups.find((goal) => goal.slug === slug);
export const findService = (slug:string) => allServices.find((service) => service.slug === slug);
