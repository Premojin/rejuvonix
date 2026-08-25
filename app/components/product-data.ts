export type Product = {
  slug: string;
  name: string;
  shortName: string;
  ingredient: string;
  format: string;
  cadence: string;
  status: string;
  image: string;
  heroImage: string;
  intro: string;
  highlights: string[];
  ingredientPoints: string[];
  directions: string[];
  featureTitle: string;
  features: { title: string; copy: string }[];
  safety: string;
  labelUrl?: string;
};

export const products: Product[] = [
  {
    slug: "glp-1-injections", name: "GLP-1 Injections", shortName: "GLP-1 injections", ingredient: "Compounded prescription option", format: "Injection", cadence: "Usually once weekly", status: "Compounded medication", image: "/glp1-injections.png", heroImage: "/rejuvonix-couple-walk.png",
    intro: "A provider may consider a patient-specific compounded injectable when it is clinically appropriate, legally available and cannot be met by a commercially available product.",
    highlights: ["Online health assessment", "Independent licensed provider review", "Dose and schedule selected by the prescriber"],
    ingredientPoints: ["The active ingredient and formulation depend on the provider’s prescription.", "Compounded medications are prepared for an individual patient by a licensed pharmacy.", "They are not generic versions of branded medications and are not FDA approved."],
    directions: ["Use only as prescribed by your provider", "Follow the pharmacy’s storage and injection instructions", "Complete provider check-ins before dose changes"],
    featureTitle: "Personalized injectable care, followed online.",
    features: [{title:"Provider selected",copy:"Your health history guides every prescribing decision."},{title:"Clear instructions",copy:"Your pharmacy provides preparation, storage and use guidance."},{title:"Ongoing check-ins",copy:"Return to the platform for progress and tolerance reviews."}],
    safety: "Compounded medications are not FDA approved. The FDA does not review compounded products for safety, effectiveness or quality before they are marketed. Availability depends on applicable law, clinical need and pharmacy access."
  },
  {
    slug: "glp-1-tablets", name: "GLP-1 Tablets", shortName: "GLP-1 tablets", ingredient: "Compounded prescription option", format: "Dissolvable tablet", cadence: "Usually once daily", status: "Compounded medication", image: "/glp1-tablets.png", heroImage: "/rejuvonix-lifestyle.png",
    intro: "A provider may consider a patient-specific compounded oral option when it is medically appropriate and legally available.",
    highlights: ["Needle-free format", "Independent licensed provider review", "Simple daily routine when prescribed"],
    ingredientPoints: ["The exact ingredient and strength depend on the prescription.", "A licensed pharmacy prepares the patient-specific formulation.", "Compounded tablets are not FDA approved."],
    directions: ["Take only as directed by your provider and pharmacy", "Follow timing, food and water instructions exactly", "Do not change strength without provider review"],
    featureTitle: "A daily option designed around your treatment plan.",
    features: [{title:"Needle free",copy:"An oral format for patients who prefer not to inject."},{title:"Patient specific",copy:"The prescriber determines whether a compounded form is appropriate."},{title:"Care in one place",copy:"Follow next steps and check-ins through Rejuvonix."}],
    safety: "Compounded medications are not FDA approved and may differ from FDA-approved products. Your provider and dispensing pharmacy supply the instructions that apply to your prescription."
  },
  {
    slug: "wegovy-pill", name: "Wegovy® Pill", shortName: "Wegovy® Pill", ingredient: "Semaglutide", format: "Oral tablet", cadence: "Once daily", status: "FDA-approved branded medication", image: "/wegovy-pill.png", heroImage: "/rejuvonix-member-phone.png",
    intro: "Wegovy® Pill is a once-daily prescription GLP-1 medication for chronic weight management in eligible adults, used with reduced-calorie nutrition and increased physical activity.",
    highlights: ["FDA-approved branded medication", "Once-daily oral format", "Provider evaluation required"],
    ingredientPoints: ["Contains semaglutide, a GLP-1 receptor agonist.", "GLP-1 medicines can affect appetite and how quickly the stomach empties.", "Your provider reviews your history, medications and contraindications."],
    directions: ["Take exactly as stated in the prescribing information", "Follow all food, water and timing instructions", "Swallow whole unless your prescription instructions say otherwise"],
    featureTitle: "GLP-1 treatment in a daily pill.",
    features: [{title:"FDA approved",copy:"A branded prescription option reviewed by the FDA."},{title:"No injection",copy:"An oral format for eligible patients who prefer a pill."},{title:"Provider led",copy:"A licensed provider determines whether it fits your health needs."}],
    safety: "Wegovy® has a boxed warning about the risk of thyroid C-cell tumors. Do not use Wegovy® if you or a family member have had medullary thyroid carcinoma or if you have Multiple Endocrine Neoplasia syndrome type 2. Review the complete prescribing information with your provider."
    ,labelUrl: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/215256s033lbl.pdf"
  },
  {
    slug: "wegovy-injection", name: "Wegovy® Injection", shortName: "Wegovy® Injection", ingredient: "Semaglutide", format: "Injection pen", cadence: "Once weekly", status: "FDA-approved branded medication", image: "/wegovy-injection.png", heroImage: "/rejuvonix-movement.png",
    intro: "Wegovy® is a once-weekly prescription GLP-1 medication for chronic weight management in eligible adults, used with reduced-calorie nutrition and increased physical activity.",
    highlights: ["FDA-approved branded medication", "Once-weekly injection", "Multiple prescribed dose strengths"],
    ingredientPoints: ["Contains semaglutide, a GLP-1 receptor agonist.", "It can reduce appetite and slow gastric emptying.", "Your provider selects the starting dose and any dose increases."],
    directions: ["Inject once weekly on the day selected with your provider", "Use under the skin as directed", "Rotate injection areas and follow pen instructions"],
    featureTitle: "Once-weekly GLP-1 care in a prefilled pen.",
    features: [{title:"FDA approved",copy:"A branded medicine approved for chronic weight management."},{title:"Weekly routine",copy:"A once-weekly format when prescribed."},{title:"Dose progression",copy:"Your provider manages dosing based on response and tolerability."}],
    safety: "Wegovy® has a boxed warning about the risk of thyroid C-cell tumors. Do not use Wegovy® if you or a family member have had medullary thyroid carcinoma or if you have Multiple Endocrine Neoplasia syndrome type 2. Review the complete prescribing information with your provider."
    ,labelUrl: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/215256s033lbl.pdf"
  },
  {
    slug: "zepbound-injection", name: "Zepbound® Injection", shortName: "Zepbound® Injection", ingredient: "Tirzepatide", format: "Injection", cadence: "Once weekly", status: "FDA-approved branded medication", image: "/zepbound-injection.png", heroImage: "/rejuvonix-get-started-group.png",
    intro: "Zepbound® is a once-weekly prescription GIP and GLP-1 receptor agonist for chronic weight management in eligible adults, used with reduced-calorie nutrition and increased physical activity.",
    highlights: ["FDA-approved branded medication", "Targets GIP and GLP-1 receptors", "Once-weekly injection"],
    ingredientPoints: ["Contains tirzepatide, a GIP and GLP-1 receptor agonist.", "It can affect appetite, food intake and gastric emptying.", "A provider determines eligibility, dose and follow-up needs."],
    directions: ["Inject once weekly as prescribed", "Use under the skin in an approved injection area", "Rotate injection areas and follow device instructions"],
    featureTitle: "Dual-receptor treatment in a weekly injection.",
    features: [{title:"FDA approved",copy:"A branded option approved for chronic weight management."},{title:"Dual action",copy:"Targets both GIP and GLP-1 receptors."},{title:"Provider managed",copy:"Your provider reviews response before any dose change."}],
    safety: "Zepbound® has a boxed warning about the risk of thyroid C-cell tumors. Do not use Zepbound® if you or a family member have had medullary thyroid carcinoma or if you have Multiple Endocrine Neoplasia syndrome type 2. Review the complete prescribing information with your provider."
    ,labelUrl: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/217806s042lbl.pdf"
  }
];

export const getProduct = (slug: string) => products.find(product => product.slug === slug);
