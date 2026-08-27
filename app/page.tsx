"use client";
/* eslint-disable @next/next/no-html-link-for-pages */

import { useEffect, useMemo, useRef, useState } from "react";
import { GoalMegaMenu } from "./components/SiteChrome";
import { careJourney } from "./components/CareJourney";
import { products } from "./components/product-data";
import { TreatmentCard } from "./components/TreatmentCard";

const legacyJourney = [
  ["01","Program selected","Choose the area where you want support."],
  ["02","Assessment complete","Review your answers and the approved consent language before submission."],
  ["03","Submitted","Receive confirmation that your information entered the clinical workflow."],
  ["04","More information needed","Respond to a provider request, laboratory requirement or appointment step."],
  ["05","Review resumed","Your case returns to the independent provider for review."],
  ["06","Provider outcome","Receive the provider’s decision and next steps; treatment is never guaranteed."],
  ["07","Pharmacy handoff","If prescribed, follow independent pharmacy fulfillment status."],
  ["08","Follow-up","Complete required check-ins, laboratory work and provider visits."],
  ["09","Reassessment and renewal","Your provider decides whether care continues, changes, pauses or ends."],
];
void legacyJourney;
const journey = careJourney;

type HeroProgram = {
  title: string;
  href: string;
  image: string;
  kind: string;
  subtitle?: string;
  price?: string;
  cadence?: string;
};

const completeExperience = [
  {number:"01", title:"Online assessment", copy:"Share your health history, goals and treatment preferences through the approved clinical intake when it becomes available.", image:"/complete-assessment.png", alt:"A patient completing an online health assessment at home"},
  {number:"02", title:"Provider review", copy:"Connect with an independent licensed provider who makes all clinical decisions.", image:"/complete-provider-review.png", alt:"A clinician speaking with a patient during an online provider review"},
  {number:"03", title:"One place to follow care", copy:"View next steps, order progress, provider messages and check-in reminders.", image:"/complete-follow-care.png", alt:"A patient following care updates on a phone and laptop"},
  {number:"04", title:"Delivery coordination", copy:"If prescribed, an independent licensed pharmacy prepares and ships your medication.", image:"/complete-delivery.png", alt:"A pharmacy professional coordinating a discreet medication delivery"},
];

const wellnessPrograms = [
  {number:"01", name:"Weight loss", kicker:"Metabolic confidence", headline:"Feel lighter. Move forward with confidence.", copy:"Provider-guided care built around your health history, goals and daily routine.", image:"/program-weight-loss-success-v2.png", alt:"A smiling woman showing the extra room in the waist of her older pants", position:"right bottom", visualClass:"silhouette weight-loss-figure", moment:"Achievement", reassurance:"Care that meets you where you are"},
  {number:"02", name:"Performance", kicker:"Strength and recovery", headline:"Build strength for the life you want to live.", copy:"Personalized support for energy, recovery, resilience and sustainable performance.", image:"/program-performance-runners.webp", alt:"A fit man and woman jogging together in mid-stride", position:"right center", visualClass:"silhouette performance-figure", moment:"Strength", reassurance:"Move with purpose and recover well"},
  {number:"03", name:"Sexual health", kicker:"Connection and confidence", headline:"Reconnect with confidence and intimacy.", copy:"Private, respectful telehealth care centered on comfort, communication and your individual goals.", image:"/program-sexual-health-silhouette.webp", alt:"A mature interracial couple sharing a warm and affectionate look", position:"right center", visualClass:"silhouette couple-figure", moment:"Connection", reassurance:"Private care without awkward waiting rooms"},
  {number:"04", name:"Hair restoration", kicker:"Renewed self-image", headline:"Recognize yourself with renewed confidence.", copy:"Provider-guided options designed to support fuller-looking hair and a plan you can follow from home.", image:"/program-hair-restoration-silhouette.webp", alt:"A concerned middle-aged man examining noticeable thinning hair", position:"right center", visualClass:"silhouette hair-figure", moment:"Renewal", reassurance:"A clear plan for steady progress"},
  {number:"05", name:"Skin rejuvenation", kicker:"Healthy-looking radiance", headline:"Reveal healthy-looking skin that still feels like you.", copy:"Personalized care focused on clarity, texture, tone and a naturally refreshed appearance.", image:"/program-skin-rejuvenation-silhouette.webp", alt:"A realistic middle-aged woman with clear radiant skin touching her face", position:"right center", visualClass:"silhouette skin-figure", moment:"Radiance", reassurance:"Thoughtful care for real, visible skin"},
];

const heroPrograms: HeroProgram[] = [
  { title:"Weight Loss", href:"/eligibility/weight-loss", image:"/program-weight-loss-success-v2.png", kind:"person weight" },
  { title:"Performance", href:"/eligibility/performance", image:"/mens-hormone-runner-card.png", kind:"person men" },
  { title:"Sexual Health", href:"/eligibility/sexual-health", image:"/program-sexual-health-silhouette.webp", kind:"person women sexual" },
  { title:"Hair Restoration", href:"/eligibility/hair-restoration", image:"/program-hair-restoration-silhouette.webp", kind:"person hair" },
  { title:"Skin Regeneration", href:"/eligibility/skin-restoration", image:"/program-skin-rejuvenation-silhouette.webp", kind:"person skin" },
  { title:"Compounded care", subtitle:"Patient-specific options", price:"$199", href:"/compounded", image:"/compounded-semaglutide-transparent.png", kind:"product semaglutide" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [feet, setFeet] = useState("5");
  const [inches, setInches] = useState("6");
  const [weight, setWeight] = useState("200");
  const [experienceActive, setExperienceActive] = useState(0);
  const [programActive, setProgramActive] = useState(0);
  const programTouchStart = useRef<number | null>(null);
  const bmiResult = useMemo(() => {
    const feetValue = Number.parseFloat(feet);
    const inchesValue = Number.parseFloat(inches);
    const weightValue = Number.parseFloat(weight);
    const heightInches = (Number.isFinite(feetValue) ? feetValue : 0) * 12 + (Number.isFinite(inchesValue) ? inchesValue : 0);
    if (heightInches <= 0 || !Number.isFinite(weightValue) || weightValue <= 0) return { value: 0, marker: 0, category: "Enter your measurements" };
    const value = (weightValue / (heightInches * heightInches)) * 703;
    const category = value < 18.5 ? "Below standard range" : value < 25 ? "Standard range" : value < 30 ? "Above standard range" : "Higher range";
    return { value, marker: Math.min(100, Math.max(0, ((value - 15) / 25) * 100)), category };
  }, [feet, inches, weight]);
  useEffect(() => { const timer = window.setInterval(() => setExperienceActive((current) => (current + 1) % completeExperience.length), 5000); return () => window.clearInterval(timer); }, []);
  useEffect(() => { const timer = window.setInterval(() => setProgramActive((current) => (current + 1) % wellnessPrograms.length), 5000); return () => window.clearInterval(timer); }, []);
  const openQuiz = () => { window.location.href = "/eligibility/weight-loss"; };
  const choose = (answer: string) => { const next = [...answers]; next[step] = answer; setAnswers(next); setStep(Math.min(step + 1, 3)); };

  return <main>
    <div className="announcement"><span>Online access to provider-guided wellness programs</span><button onClick={openQuiz}>Start assessment <b>→</b></button></div>
    <header className="site-header program-header">
      <a className="brand" href="#top" aria-label="Rejuvonix home"><img src="/rejuvonix-logo-mark.png" alt="" />REJUVONIX<span>.</span></a>
      <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Primary navigation">
        <span className="nav-menu-group goals-menu"><a href="/goals/weight-loss">Your Goals</a><GoalMegaMenu/></span><span className="nav-menu-group membership-menu"><a href="/membership">Membership</a><span className="nav-dropdown"><a href="/membership">Why Membership</a><a href="/how-it-works">How membership works</a></span></span><span className="nav-menu-group resource-menu"><a href="/support">Resource Center</a><span className="nav-dropdown"><a href="/how-it-works">How it works</a><a href="/support">Support</a><a href="/faq">FAQs</a><a href="/safety">Safety</a></span></span><span className="nav-menu-group about-menu"><a href="/how-it-works">About Us</a><span className="nav-dropdown"><a href="/how-it-works">Our approach</a><a href="/support">Our care model</a><a href="/safety">Clinical standards</a></span></span>
      </nav>
      <div className="header-actions"><a className="account-button" href="/sign-in">Account</a><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu"><span></span><span></span></button></div>
    </header>

    <section className="program-hero" id="top">
      <div className="program-hero-copy">
        <p className="eyebrow">PROVIDER-GUIDED CARE, BUILT<br/>AROUND YOU</p>
        <h1>Personalized<br/>care for<br/>how you<br/>want to live.</h1>
        <p>Explore online pathways for weight loss, performance, sexual health, hair restoration and skin regeneration, with licensed-provider review where clinical care is involved.</p>
        <a href="#programs">Explore programs <span>→</span></a>
      </div>
      <div className="program-card-grid" aria-label="Featured programs and treatments">
        {heroPrograms.map((card) => <a className={`program-card ${card.kind}`} href={card.href} key={card.title}>
          <span className="program-card-copy"><strong>{card.title}</strong>{card.subtitle && <small>{card.subtitle}</small>}{card.price && <b>{card.price}</b>}{card.cadence && <small>{card.cadence}</small>}</span>
          <span className="program-card-visual"><span className="motion-orbit" aria-hidden="true"></span><img src={card.image} alt="" /></span>
          <span className="program-card-link">Explore treatment <b>→</b></span>
        </a>)}
      </div>
    </section>

    <section className="trust-strip" aria-label="Program highlights">
      {[["✓","Licensed providers","Independent clinical review"],["⌁","100% online","From assessment to follow-up"],["◇","Clear next steps","No guesswork, no pressure"],["↗","Discreet delivery","If prescribed and fulfilled"]].map(([icon,title,copy]) => <div key={title}><span className="trust-icon">{icon}</span><p><strong>{title}</strong><br/>{copy}</p></div>)}
    </section>

    <section className="wellness-showcase" id="programs" aria-labelledby="wellness-programs-title">
      <div className="wellness-heading">
        <div><p className="eyebrow">Our programs</p><h2 id="wellness-programs-title">Care for every chapter of your wellness.</h2></div>
        <p>Choose the change you want to make. Rejuvonix brings the assessment, provider review and next steps into one connected experience.</p>
      </div>
      <div className={`wellness-stage program-${programActive + 1}`} onTouchStart={(event)=>{programTouchStart.current=event.touches[0]?.clientX ?? null}} onTouchEnd={(event)=>{if(programTouchStart.current===null)return;const distance=(event.changedTouches[0]?.clientX ?? programTouchStart.current)-programTouchStart.current;if(Math.abs(distance)>45)setProgramActive((programActive+(distance<0?1:wellnessPrograms.length-1))%wellnessPrograms.length);programTouchStart.current=null}}>
        <div className="wellness-images">{wellnessPrograms.map((program,index)=><img key={program.name} className={`${program.visualClass ?? "lifestyle-photo"} ${programActive===index?"active":""}`} src={program.image} alt={programActive===index?program.alt:""} aria-hidden={programActive!==index} style={{objectPosition:program.position}}/>)}</div>
        <div className="wellness-shade"></div>
        <div className="wellness-copy" key={programActive}>
          <div className="wellness-index"><span>{wellnessPrograms[programActive].number}</span><small>OF 05</small></div>
          <p className="wellness-kicker">{wellnessPrograms[programActive].kicker}</p>
          <h3>{wellnessPrograms[programActive].headline}</h3>
          <p className="wellness-description">{wellnessPrograms[programActive].copy}</p>
          <div className="wellness-action"><button className="primary aqua" onClick={()=>{const slugs=["weight-loss","performance","sexual-health","hair-restoration","skin-restoration"];window.location.href=`/eligibility/${slugs[programActive]}`}}>Explore {wellnessPrograms[programActive].name.toLowerCase()}</button><span>✓ {wellnessPrograms[programActive].reassurance}</span></div>
        </div>
        <div className="wellness-word" aria-hidden="true">{wellnessPrograms[programActive].moment}</div>
        <div className="wellness-arrows"><button onClick={()=>setProgramActive((programActive+wellnessPrograms.length-1)%wellnessPrograms.length)} aria-label="Previous program">←</button><button onClick={()=>setProgramActive((programActive+1)%wellnessPrograms.length)} aria-label="Next program">→</button></div>
      </div>
      <div className="wellness-tabs" role="tablist" aria-label="Wellness programs">{wellnessPrograms.map((program,index)=><button key={program.name} className={programActive===index?"active":""} onClick={()=>setProgramActive(index)} role="tab" aria-selected={programActive===index}><span>{program.number}</span><strong>{program.name}</strong><small>{program.kicker}</small><i><b></b></i></button>)}</div>
    </section>

    <section className="section-shell" id="treatments">
      <div className="section-heading"><div><p className="eyebrow">Treatment options</p><h2>Find out which option may be right for you.</h2></div><p>A provider reviews your health history, preferences and goals before recommending treatment.</p></div>
      <div className="treatment-grid branded-grid">{products.map((product,index)=><TreatmentCard product={product} index={index} key={product.slug}/>)}</div>
      <p className="section-disclaimer">Prescription products require an online consultation with an independent licensed healthcare provider who determines whether a prescription is appropriate. Compounded medications are not FDA approved.</p>
    </section>

    <section className="bmi-section" aria-labelledby="bmi-title">
      <div className="bmi-intro"><p className="eyebrow">A useful starting point</p><h2 id="bmi-title">Check your BMI.</h2><p>Enter your height and weight for a quick estimate. A licensed provider considers your full health history, not BMI alone.</p></div>
      <div className="bmi-card">
        <div className="bmi-fields">
          <label>Height <span><input type="number" inputMode="numeric" min="1" max="8" step="1" value={feet} onInput={(e) => setFeet(e.currentTarget.value)} aria-label="Height in feet" /> ft</span><span><input type="number" inputMode="numeric" min="0" max="11" step="1" value={inches} onInput={(e) => setInches(e.currentTarget.value)} aria-label="Additional height in inches" /> in</span></label>
          <label>Weight <span className="weight-field"><input type="number" inputMode="decimal" min="1" max="1000" step="0.1" value={weight} onInput={(e) => setWeight(e.currentTarget.value)} aria-label="Weight in pounds" /> lb</span></label>
        </div>
        <div className="bmi-result digital-bmi" aria-live="polite"><div className="digital-readout"><span>Estimated BMI</span><strong>{bmiResult.value > 0 ? bmiResult.value.toFixed(1) : "Not calculated"}</strong><em>{bmiResult.category}</em></div><div className="bmi-meter" aria-hidden="true"><div className="bmi-track"><span className="bmi-marker" style={{left:`${bmiResult.marker}%`}}></span></div><div className="bmi-labels"><span>15</span><span>20</span><span>25</span><span>30</span><span>35</span><span>40+</span></div></div><div className="bmi-key" aria-label="BMI scale color key"><strong>Scale key</strong><ul><li><i className="bmi-key-low" aria-hidden="true"></i><span>Below range<br/><small>Under 18.5</small></span></li><li><i className="bmi-key-standard" aria-hidden="true"></i><span>Standard range<br/><small>18.5 to 24.9</small></span></li><li><i className="bmi-key-above" aria-hidden="true"></i><span>Above range<br/><small>25 to 29.9</small></span></li><li><i className="bmi-key-high" aria-hidden="true"></i><span>Higher range<br/><small>30 to 34.9</small></span></li><li><i className="bmi-key-highest" aria-hidden="true"></i><span>Highest range<br/><small>35+</small></span></li></ul></div><small>This estimate updates as you type. BMI is a screening measure, not a diagnosis. A licensed provider considers your complete health history.</small></div>
        <button className="primary" onClick={openQuiz}>Continue to eligibility</button>
      </div>
    </section>

    <section className="experience-section" aria-labelledby="experience-title">
      <div className="experience-intro"><p className="eyebrow">The Rejuvonix experience</p><h2 id="experience-title">Care should feel this connected.</h2><p>Step inside a clear, personal experience built around your questions, your provider and your next step.</p></div>
      <div className={`experience-stage experience-slide-${experienceActive + 1}`} aria-live="polite">
        <div className="experience-visuals">{completeExperience.map((item,index)=><img key={item.number} className={experienceActive===index?"active":""} src={item.image} alt={experienceActive===index?item.alt:""} aria-hidden={experienceActive!==index}/>)}</div>
        <div className={`experience-panel panel-${experienceActive + 1}`} key={experienceActive}>
          <div className="experience-count"><span>{completeExperience[experienceActive].number}</span><small>OF 04</small></div>
          <p className="experience-label">YOUR CARE, STEP BY STEP</p>
          <h3>{completeExperience[experienceActive].title}</h3>
          <p>{completeExperience[experienceActive].copy}</p>
          <div className="experience-reassurance"><span>✓</span><strong>{["Online starting point","Independent clinical review","Clear updates in one place","Coordinated fulfillment"][experienceActive]}</strong></div>
        </div>
        <div className="experience-arrows"><button onClick={()=>setExperienceActive((experienceActive + 3) % 4)} aria-label="Previous experience">←</button><button onClick={()=>setExperienceActive((experienceActive + 1) % 4)} aria-label="Next experience">→</button></div>
      </div>
      <div className="experience-navigation" role="tablist" aria-label="Rejuvonix experience steps">{completeExperience.map((item,index)=><button key={item.number} className={experienceActive===index?"active":""} onClick={()=>setExperienceActive(index)} role="tab" aria-selected={experienceActive===index}><span>{item.number}</span><strong>{item.title}</strong><i><b></b></i></button>)}</div>
    </section>

    <section className="care-feature">
      <div className="care-feature-photo"><img src="/rejuvonix-member-phone.png" alt="A member using the Rejuvonix platform at home" /><div className="photo-caption"><span>ONLINE ACCESS</span><strong>Care from home</strong></div></div>
      <div className="care-feature-copy"><p className="eyebrow">More than a prescription</p><h2>Keep your care close, even on busy days.</h2><p>Use Rejuvonix to complete your assessment, follow your order and stay current with provider check-ins.</p><div className="care-points"><div><span>01</span><strong>Start online</strong><p>Complete the health assessment when it works for you.</p></div><div><span>02</span><strong>Follow each step</strong><p>See provider review and pharmacy fulfillment updates.</p></div><div><span>03</span><strong>Stay connected</strong><p>Return for check-ins and ongoing treatment support.</p></div></div><button className="primary" onClick={openQuiz}>Check my eligibility</button></div>
    </section>

    <section className="compounded-section" id="compounded">
      <div className="compounded-intro"><p className="eyebrow">Compounded medications</p><h2>Compare semaglutide and tirzepatide.</h2><p>An independent provider may prescribe a compounded medication when it is legally available and appropriate for the patient. Compounded medications are not generic versions of branded drugs, and they are not FDA approved.</p></div>
      <div className="glance-grid">
        <article className="glance-card semaglutide"><img className="glance-silhouette homepage-vial-silhouette" src="/homepage-semaglutide-silhouette.png" alt="" aria-hidden="true" /><div className="glance-content"><div className="glance-number">01</div><p className="pill-label">Compounded option</p><h3>Semaglutide</h3><p className="glance-sub">Acts on the GLP-1 receptor.</p><dl><div><dt>Typical format</dt><dd>Injection*</dd></div><div><dt>Schedule</dt><dd>Set by provider</dd></div><div><dt>Clinical review</dt><dd>Required</dd></div><div><dt>FDA status</dt><dd>Not FDA approved</dd></div></dl><button onClick={openQuiz}>Check eligibility <span>→</span></button></div></article>
        <article className="glance-card tirzepatide"><img className="glance-silhouette homepage-vial-silhouette" src="/homepage-tirzepatide-silhouette.png" alt="" aria-hidden="true" /><div className="glance-content"><div className="glance-number">02</div><p className="pill-label">Compounded option</p><h3>Tirzepatide</h3><p className="glance-sub">Acts on the GIP and GLP-1 receptors.</p><dl><div><dt>Typical format</dt><dd>Injection*</dd></div><div><dt>Schedule</dt><dd>Set by provider</dd></div><div><dt>Clinical review</dt><dd>Required</dd></div><div><dt>FDA status</dt><dd>Not FDA approved</dd></div></dl><button onClick={openQuiz}>Check eligibility <span>→</span></button></div></article>
      </div><p className="compounded-note">*Form, ingredients, concentration and availability vary by prescription and dispensing pharmacy. Compounded medications are prepared for an identified patient and are not reviewed by FDA for safety, effectiveness or quality before marketing.</p>
    </section>

    <section className="human-story">
      <div className="story-image story-main"><img src="/rejuvonix-movement.png" alt="Woman enjoying a walk outdoors" /></div>
      <div className="story-copy"><p className="eyebrow">Made for everyday life</p><h2>Your care should be easy to understand.</h2><p>Rejuvonix keeps your assessment, provider review, order status and follow-up information in one place.</p><div className="story-stat"><strong>Everything in one place</strong><span>Assessment · provider · pharmacy · follow-up</span></div></div>
      <div className="story-image story-side"><img src="/rejuvonix-lifestyle-white-couple.webp" alt="A white middle-aged couple preparing a healthy meal together" /></div>
    </section>

    <section className="how-section" id="journey">
      <div className="section-heading light"><div><p className="eyebrow">Expected care journey</p><h2>Here is what the connected process will include.</h2></div><p>The current site simulates these stages. Real submission, provider review and fulfillment remain disabled until the approved clinical integration is active.</p></div>
      <div className="journey-layout"><div className="journey-photo"><img src="/rejuvonix-clinician.png" alt="Clinician speaking with a patient by video" /><span>Private, provider-led care</span></div><div className="journey-steps">{journey.map(([number,title,copy]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div>
      <button className="primary aqua" onClick={openQuiz}>Start with a few questions</button>
    </section>

    <section className="editorial-banner"><img src="/rejuvonix-couple-walk.png" alt="Couple enjoying a morning walk together" /><div className="editorial-panel"><p className="eyebrow">Built for daily life</p><h2>Health care should feel personal.</h2><p>Your treatment starts with your health history, your goals and a provider’s clinical review.</p><button className="primary" onClick={openQuiz}>Get started</button></div></section>

    <section className="program-section" id="membership">
      <div className="program-copy"><p className="eyebrow">The Rejuvonix program</p><h2>Your care, organized in one place.</h2><p>Use the platform for your assessment, order updates, progress check-ins and maintenance conversations once the clinical integration is active.</p><div className="benefit-list">{["Online assessment pathway","Access to independent licensed providers","Treatment and fulfillment status","Progress check-ins","Nutrition and movement guidance","Maintenance planning"].map(item => <div key={item}><span>✓</span>{item}</div>)}</div><button className="primary" onClick={openQuiz}>Review my options</button></div>
      <div className="program-visual"><img src="/rejuvonix-doctor-silhouette.png" alt="A doctor speaking with a patient during a telehealth visit" /><div className="program-glow"></div><div className="program-status status-one"><span>01</span><p><small>ASSESSMENT</small><strong>Online pathway</strong></p></div><div className="program-status status-two"><span>02</span><p><small>PROVIDER REVIEW</small><strong>Clinically evaluated</strong></p></div><div className="portal-card program-portal"><div className="portal-top"><span>YOUR CARE</span><b>Preview</b></div><div className="program-progress"><span></span></div><div className="portal-row"><span>Next check-in</span><strong>Preview</strong></div><div className="portal-row"><span>Provider message</span><strong>Disabled</strong></div><div className="portal-row"><span>Order status</span><strong>Disabled</strong></div></div></div>
    </section>

    <section className="clinical-section" id="safety">
      <div><p className="eyebrow">Independent clinical care</p><h2>A licensed provider reviews every assessment.</h2></div>
      <div className="clinical-copy"><p>Rejuvonix connects you with independent licensed healthcare providers. The provider reviews your health information and decides whether a prescription is appropriate.</p><a href="/faq">Read common questions <span>→</span></a></div>
    </section>

    <section className="faq-section" id="faq"><div className="faq-intro"><p className="eyebrow">Frequently asked questions</p><h2>What to know before you begin.</h2></div><div className="faq-list">
      <details><summary>Does completing the assessment guarantee a prescription?<span>+</span></summary><p>No. An independent licensed healthcare provider reviews your information and determines whether any treatment is medically appropriate.</p></details>
      <details><summary>Which branded treatments are featured?<span>+</span></summary><p>Rejuvonix currently features Wegovy® Pill, Wegovy® Injection and Zepbound® Injection. Availability is subject to provider determination, partner access, state rules and supply.</p></details>
      <details><summary>Are compounded medications FDA approved?<span>+</span></summary><p>No. Compounded medications are not FDA approved, and FDA does not review them for safety, effectiveness or quality before they are marketed. A provider determines whether a patient-specific compounded option is appropriate and legally available.</p></details>
      <details><summary>Is Rejuvonix a healthcare provider or pharmacy?<span>+</span></summary><p>Rejuvonix is a technology and administrative-services platform. Medical care is provided by independent licensed healthcare professionals, and medication is dispensed by independent licensed pharmacies.</p></details>
    </div></section>

    <section className="closing-cta closing-people" aria-labelledby="closing-title">
      <img src="/wellness-sexual-health.jpg" alt="Adults moving forward with confidence" />
      <div className="closing-people-panel">
        <p className="eyebrow">Get started</p>
        <h2 id="closing-title">Take the first step toward care that fits your life.</h2>
        <p className="closing-copy">Tell us about your health, goals and preferences. We will help connect you with a licensed provider who can review your information.</p>
        <button className="primary" onClick={openQuiz}>Check my eligibility</button>
        <small>It takes a few minutes. A prescription is not guaranteed.</small>
      </div>
    </section>

    <section className="care-assurances" aria-label="Care experience standards">
      <article><span>01</span><div><strong>Private online process</strong><p>Complete each step from home.</p></div></article>
      <article><span>02</span><div><strong>Independent clinical review</strong><p>A licensed provider decides what is appropriate.</p></div></article>
      <article><span>03</span><div><strong>Licensed pharmacy fulfillment</strong><p>Prescriptions are filled by independent pharmacy partners.</p></div></article>
    </section>

    <footer><div className="footer-main"><div><a className="brand" href="/"><img src="/rejuvonix-logo-mark.png" alt="" />REJUVONIX<span>.</span></a><p>Provider-guided wellness pathways online.</p></div><div><strong>Explore</strong><a href="/treatments">Treatments</a><a href="/how-it-works">How it works</a><a href="/support">The program</a></div><div><strong>Policies</strong><a href="/privacy">Privacy status</a><a href="/terms">Website terms</a><a href="/telehealth-consent">Telehealth consent</a><a href="/disclaimer">Disclaimer</a></div><div><strong>Support</strong><a href="/faq">FAQ</a><a href="/safety">Safety</a><a href="/accessibility">Accessibility</a><a href="/support#contact">Contact</a></div></div><div className="medical-disclaimer" id="medical-disclaimer"><strong>Medical and platform disclaimer</strong><p>Rejuvonix is a technology and administrative-services platform and is not a healthcare provider, medical practice, pharmacy, laboratory, drug manufacturer or insurance company. Rejuvonix connects individuals with independent licensed healthcare providers who are solely responsible for clinical evaluations, diagnoses, treatment recommendations and prescribing decisions. If prescribed, medication is dispensed by an independent licensed pharmacy. Compounded medications are not FDA approved. Individual results vary.</p></div><div className="footer-bottom"><span>© 2026 Rejuvonix. All rights reserved.</span><span>Wegovy® is a registered trademark of Novo Nordisk A/S. Zepbound® is a registered trademark of Eli Lilly and Company. Rejuvonix is not affiliated with or endorsed by these companies.</span></div></footer>

    {quizOpen && <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setQuizOpen(false)}><section className="quiz-modal" role="dialog" aria-modal="true" aria-labelledby="quiz-title"><button className="modal-close" onClick={() => setQuizOpen(false)} aria-label="Close">×</button><div className="quiz-brand"><img src="/rejuvonix-logo-mark.png" alt="" />REJUVONIX<span>.</span></div>
      {step < 3 ? <><div className="progress"><span style={{width:`${(step + 1) * 33.33}%`}}></span></div><p className="quiz-step">Question {step + 1} of 3</p><h2 id="quiz-title">{["What would you most like help achieving?","How would you prefer to receive treatment?","Do you plan to use insurance?"][step]}</h2><div className="quiz-options">{[["Lose weight","Control my appetite","Improve metabolic health","Maintain my progress"],["Weekly injection","Daily pill","I’m open to either","Let a provider help me decide"],["Yes","No","I’m not sure"]][step].map(option => <button key={option} onClick={() => choose(option)}>{option}<span>→</span></button>)}</div>{step > 0 && <button className="back-button" onClick={() => setStep(step - 1)}>← Back</button>}</>
      : <div className="quiz-result"><span className="result-mark">✓</span><p className="eyebrow">Your next step</p><h2 id="quiz-title">You may have more than one treatment option.</h2><p>Continue to the non-submitting assessment preview. A licensed provider would determine what may be appropriate after the approved clinical intake is connected.</p><button className="primary" onClick={openQuiz}>Continue to assessment</button><button className="secondary" onClick={() => {setQuizOpen(false); document.getElementById("treatments")?.scrollIntoView({behavior:"smooth"});}}>Compare treatments first</button><small>Completing an assessment does not guarantee a prescription.</small></div>}
    </section></div>}
  </main>;
}
