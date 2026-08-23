"use client";

import { useEffect, useRef, useState } from "react";

const treatments = [
  {name:"GLP-1 Injections", ingredient:"Compounded prescription option", format:"One injection per week", image:"/glp1-injections.png", tag:"Compounded medication"},
  {name:"GLP-1 Tablets", ingredient:"Compounded prescription option", format:"One dissolvable tablet per day", image:"/glp1-tablets.png", tag:"Compounded medication"},
  {name:"Wegovy® Pill", ingredient:"Semaglutide", format:"One pill per day", image:"/wegovy-pill.png", tag:"FDA-approved branded medication"},
  {name:"Wegovy® Injection", ingredient:"Semaglutide", format:"Once-weekly injection", image:"/wegovy-injection.png", tag:"FDA-approved branded medication"},
  {name:"Zepbound® Injection", ingredient:"Tirzepatide", format:"Once-weekly injection", image:"/zepbound-injection.png", tag:"FDA-approved branded medication"},
];

const journey = [
  ["01","Review your options","See the branded and compounded treatments available through the platform."],
  ["02","Answer a few questions","Start with a short eligibility questionnaire. There is no commitment."],
  ["03","Complete your assessment","Share your medical history, current medications and weight care goals."],
  ["04","Wait for provider review","An independent licensed provider reviews your assessment."],
  ["05","Receive your treatment plan","If treatment is appropriate, your provider decides what to prescribe."],
  ["06","Track your order","A licensed pharmacy fills and ships your prescription."],
  ["07","Check in regularly","Use the platform to complete follow-ups and keep up with your next steps."],
];

const completeExperience = [
  {number:"01", title:"Online assessment", copy:"Share your health history, goals and treatment preferences securely.", image:"/complete-assessment.png", alt:"A patient completing an online health assessment at home"},
  {number:"02", title:"Provider review", copy:"Connect with an independent licensed provider who makes all clinical decisions.", image:"/complete-provider-review.png", alt:"A clinician speaking with a patient during an online provider review"},
  {number:"03", title:"One place to follow care", copy:"View next steps, order progress, provider messages and check-in reminders.", image:"/complete-follow-care.png", alt:"A patient following care updates on a phone and laptop"},
  {number:"04", title:"Delivery coordination", copy:"If prescribed, an independent licensed pharmacy prepares and ships your medication.", image:"/complete-delivery.png", alt:"A pharmacy professional coordinating a discreet medication delivery"},
];

const sampleReviews = [
  {headline:"Simple from the start", review:"The assessment was easy to follow, and I always knew what the next step was.", name:"Danielle M.", treatment:"Wegovy® Injection", date:"Sample review", image:"/wegovy-member-outdoors.jpg", alt:"Smiling woman outdoors"},
  {headline:"Everything stayed organized", review:"I liked being able to check messages, order progress and follow-up details in one place.", name:"Alicia R.", treatment:"GLP-1 program", date:"Sample review", image:"/wegovy-member-platform.jpg", alt:"Woman checking her phone at home"},
  {headline:"Clear and comfortable", review:"The provider review felt private and straightforward. The instructions were easy to understand.", name:"Evelyn T.", treatment:"Semaglutide program", date:"Sample review", image:"/wegovy-followup-member.jpg", alt:"Mature woman using her phone at home"},
  {headline:"Care that fit my routine", review:"The online process worked around my schedule, which made it much easier to stay consistent.", name:"Monique S.", treatment:"Tirzepatide program", date:"Sample review", image:"/wegovy-movement-member.jpg", alt:"Woman holding a yoga mat"},
  {headline:"Support without the confusion", review:"Each step was explained clearly, from the assessment through delivery coordination.", name:"Carlos D.", treatment:"GLP-1 program", date:"Sample review", image:"/rejuvonix-member-phone.png", alt:"Man reviewing care information on a phone"},
  {headline:"A more personal experience", review:"I appreciated having a clear place to return for updates, questions and ongoing follow-up.", name:"Jordan K.", treatment:"Wegovy® program", date:"Sample review", image:"/rejuvonix-couple-walk.png", alt:"Couple enjoying a walk outdoors"},
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
  const reviewRailRef = useRef<HTMLDivElement>(null);
  const heightInches = Math.max(1, Number(feet) * 12 + Number(inches));
  const bmi = Number(weight) > 0 ? (Number(weight) / (heightInches * heightInches)) * 703 : 0;
  useEffect(() => { const timer = window.setTimeout(() => setQuizOpen(true), 12000); return () => window.clearTimeout(timer); }, []);
  useEffect(() => { const timer = window.setInterval(() => setExperienceActive((current) => (current + 1) % completeExperience.length), 7000); return () => window.clearInterval(timer); }, []);
  const openQuiz = () => { setStep(0); setAnswers([]); setQuizOpen(true); };
  const choose = (answer: string) => { const next = [...answers]; next[step] = answer; setAnswers(next); setStep(Math.min(step + 1, 3)); };
  const scrollReviews = (direction: number) => reviewRailRef.current?.scrollBy({left: direction * 390, behavior:"smooth"});

  return <main>
    <div className="announcement"><span>Online access to prescription weight care</span><button onClick={openQuiz}>Check eligibility <b>→</b></button></div>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Rejuvonix home"><img src="/rejuvonix-logo-mark.png" alt="" />REJUVONIX<span>.</span></a>
      <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Primary navigation">
        <a href="/treatments">Treatments</a><a href="/compounded">Compounded</a><a href="/how-it-works">How it works</a><a href="/support">Support</a>
      </nav>
      <div className="header-actions"><a className="text-button" href="/sign-in">Sign in</a><a className="primary small" href="/get-started">Get started</a><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu"><span></span><span></span></button></div>
    </header>

    <section className="hero" id="top">
      <div className="hero-content"><p className="eyebrow">Prescription weight care online</p><h1>Weight care that fits into your life.</h1><p className="hero-copy">Review GLP-1 treatment options, complete a health assessment and connect with a licensed provider online.</p><div className="hero-actions"><button className="primary" onClick={openQuiz}>Check my eligibility</button><a className="secondary" href="#treatments">View treatments</a></div><p className="microcopy">There is no commitment. A provider decides whether treatment is appropriate.</p></div>
      <div className="hero-visual" role="img" aria-label="A woman enjoying a bright morning at home"><div className="hero-stat"><span>Online weight care</span><strong>on your schedule</strong><small>Provider access · follow-up support</small></div></div>
    </section>

    <section className="trust-strip" aria-label="Program highlights">
      {[["✓","Licensed providers","Independent clinical review"],["⌁","100% online","From assessment to follow-up"],["◇","Clear next steps","No guesswork, no pressure"],["↗","Discreet delivery","If prescribed and fulfilled"]].map(([icon,title,copy]) => <div key={title}><span className="trust-icon">{icon}</span><p><strong>{title}</strong><br/>{copy}</p></div>)}
    </section>

    <section className="bmi-section" aria-labelledby="bmi-title">
      <div className="bmi-intro"><p className="eyebrow">A useful starting point</p><h2 id="bmi-title">Check your BMI.</h2><p>Enter your height and weight for a quick estimate. A licensed provider considers your full health history, not BMI alone.</p></div>
      <div className="bmi-card">
        <div className="bmi-fields">
          <label>Height <span><input inputMode="numeric" value={feet} onChange={(e) => setFeet(e.target.value)} aria-label="Height in feet" /> ft</span><span><input inputMode="numeric" value={inches} onChange={(e) => setInches(e.target.value)} aria-label="Additional height in inches" /> in</span></label>
          <label>Weight <span className="weight-field"><input inputMode="decimal" value={weight} onChange={(e) => setWeight(e.target.value)} aria-label="Weight in pounds" /> lb</span></label>
        </div>
        <div className="bmi-result digital-bmi"><div className="digital-readout"><span>Estimated BMI</span><strong>{bmi > 0 && Number.isFinite(bmi) ? bmi.toFixed(1) : "—"}</strong><em>LIVE ESTIMATE</em></div><div className="bmi-meter" aria-hidden="true"><div className="bmi-track"><span className="bmi-marker" style={{left:`${Math.min(100,Math.max(0,((bmi-15)/25)*100))}%`}}></span></div><div className="bmi-labels"><span>15</span><span>20</span><span>25</span><span>30</span><span>35</span><span>40+</span></div></div><small>This estimate is informational and is not a diagnosis.</small></div>
        <button className="primary" onClick={openQuiz}>Continue to eligibility</button>
      </div>
    </section>

    <section className="section-shell" id="treatments">
      <div className="section-heading"><div><p className="eyebrow">Treatment options</p><h2>Find out which option may be right for you.</h2></div><p>A provider reviews your health history, preferences and goals before recommending treatment.</p></div>
      <div className="treatment-grid branded-grid">{treatments.map((item, index) => { const slugs=["glp-1-injections","glp-1-tablets","wegovy-pill","wegovy-injection","zepbound-injection"]; return <article className={`treatment-card card-${index + 1}`} key={item.name}><div className="card-top"><span>{item.tag}</span><span>0{index + 1}</span></div><div className="product-stage"><img src={item.image} alt={`${item.name} product packaging`} /></div><div className="card-content"><p>{item.ingredient}</p><h3>{item.name}</h3><span>{item.format}</span><a href={`/treatments/${slugs[index]}`}>View treatment <b>→</b></a></div></article>})}</div>
      <p className="section-disclaimer">Prescription products require an online consultation with an independent licensed healthcare provider who determines whether a prescription is appropriate. Compounded medications are not FDA approved.</p>
    </section>

    <section className="experience-section" aria-labelledby="experience-title">
      <div className="experience-intro"><p className="eyebrow">The Rejuvonix experience</p><h2 id="experience-title">Care should feel this connected.</h2><p>Step inside a clear, personal experience built around your questions, your provider and your next step.</p></div>
      <div className="experience-stage" aria-live="polite">
        <div className="experience-visuals">{completeExperience.map((item,index)=><img key={item.number} className={experienceActive===index?"active":""} src={item.image} alt={experienceActive===index?item.alt:""} aria-hidden={experienceActive!==index}/>)}</div>
        <div className={`experience-panel panel-${experienceActive + 1}`} key={experienceActive}>
          <div className="experience-count"><span>{completeExperience[experienceActive].number}</span><small>OF 04</small></div>
          <p className="experience-label">YOUR CARE, STEP BY STEP</p>
          <h3>{completeExperience[experienceActive].title}</h3>
          <p>{completeExperience[experienceActive].copy}</p>
          <div className="experience-reassurance"><span>✓</span><strong>{["Private and secure","Independent clinical review","Clear updates in one place","Coordinated fulfillment"][experienceActive]}</strong></div>
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
        <article className="glance-card semaglutide"><img className="glance-silhouette" src="/compounded-semaglutide-vial.png" alt="" aria-hidden="true" /><div className="glance-content"><div className="glance-number">01</div><p className="pill-label">Compounded option</p><h3>Semaglutide</h3><p className="glance-sub">Acts on the GLP-1 receptor.</p><dl><div><dt>Typical format</dt><dd>Injection*</dd></div><div><dt>Schedule</dt><dd>Set by provider</dd></div><div><dt>Clinical review</dt><dd>Required</dd></div><div><dt>FDA status</dt><dd>Not FDA approved</dd></div></dl><button onClick={openQuiz}>Check eligibility <span>→</span></button></div></article>
        <article className="glance-card tirzepatide"><img className="glance-silhouette" src="/compounded-tirzepatide-vial.png" alt="" aria-hidden="true" /><div className="glance-content"><div className="glance-number">02</div><p className="pill-label">Compounded option</p><h3>Tirzepatide</h3><p className="glance-sub">Acts on the GIP and GLP-1 receptors.</p><dl><div><dt>Typical format</dt><dd>Injection*</dd></div><div><dt>Schedule</dt><dd>Set by provider</dd></div><div><dt>Clinical review</dt><dd>Required</dd></div><div><dt>FDA status</dt><dd>Not FDA approved</dd></div></dl><button onClick={openQuiz}>Check eligibility <span>→</span></button></div></article>
      </div><p className="compounded-note">*Form, ingredients, concentration and availability vary by prescription and dispensing pharmacy. Compounded medications are prepared for an identified patient and are not reviewed by FDA for safety, effectiveness or quality before marketing.</p>
    </section>

    <section className="human-story">
      <div className="story-image story-main"><img src="/rejuvonix-movement.png" alt="Woman enjoying a walk outdoors" /></div>
      <div className="story-copy"><p className="eyebrow">Made for everyday life</p><h2>Your care should be easy to understand.</h2><p>Rejuvonix keeps your assessment, provider review, order status and follow-up information in one place.</p><div className="story-stat"><strong>Everything in one place</strong><span>Assessment · provider · pharmacy · follow-up</span></div></div>
      <div className="story-image story-side"><img src="/rejuvonix-lifestyle.png" alt="Couple preparing a healthy meal together" /></div>
    </section>

    <section className="how-section" id="journey">
      <div className="section-heading light"><div><p className="eyebrow">How it works</p><h2>Here is what to expect.</h2></div><p>Follow your progress from the eligibility questionnaire through provider review, pharmacy fulfillment and follow-up.</p></div>
      <div className="journey-layout"><div className="journey-photo"><img src="/rejuvonix-clinician.png" alt="Clinician speaking with a patient by video" /><span>Private, provider-led care</span></div><div className="journey-steps">{journey.map(([number,title,copy]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div>
      <button className="primary aqua" onClick={openQuiz}>Start with a few questions</button>
    </section>

    <section className="editorial-banner"><img src="/rejuvonix-couple-walk.png" alt="Couple enjoying a morning walk together" /><div className="editorial-panel"><p className="eyebrow">Built for daily life</p><h2>Health care should feel personal.</h2><p>Your treatment starts with your health history, your goals and a provider’s clinical review.</p><button className="primary" onClick={openQuiz}>Get started</button></div></section>

    <section className="reviews-section" id="reviews">
      <div className="review-topline"><div className="review-heading"><p className="eyebrow">Patient reviews</p><h2>What patients are saying.</h2><p>Sample content shown for layout review.</p></div><div className="review-controls"><button onClick={() => scrollReviews(-1)} aria-label="Previous reviews">←</button><button onClick={() => scrollReviews(1)} aria-label="Next reviews">→</button></div></div>
      <div className="review-grid" ref={reviewRailRef}>
        {sampleReviews.map((review, index) => <article className="review-card" key={review.name}>
          <div className="review-photo"><img src={review.image} alt={review.alt}/><small>0{index + 1}</small></div>
          <div className="review-content">
            <div className="review-stars" aria-label="Five star rating">★★★★★</div>
            <div className="review-copy"><h3>{review.headline}</h3><p>{review.review}</p></div>
            <div className="review-author"><div><strong>{review.name}</strong><span>{review.treatment}</span></div><time>{review.date}</time></div>
          </div>
        </article>)}
      </div>
    </section>

    <section className="program-section" id="program">
      <div className="program-copy"><p className="eyebrow">The Rejuvonix program</p><h2>Your care, organized in one place.</h2><p>Use the platform for your assessment, order updates, progress check-ins and maintenance conversations.</p><div className="benefit-list">{["Secure online assessment","Access to independent licensed providers","Treatment and fulfillment status","Progress check-ins","Nutrition and movement guidance","Maintenance planning"].map(item => <div key={item}><span>✓</span>{item}</div>)}</div><button className="primary" onClick={openQuiz}>Review my options</button></div>
      <div className="program-visual"><img src="/rejuvonix-doctor-silhouette.png" alt="A doctor speaking with a patient during a telehealth visit" /><div className="program-glow"></div><div className="program-status status-one"><span>01</span><p><small>ASSESSMENT</small><strong>Secure and online</strong></p></div><div className="program-status status-two"><span>02</span><p><small>PROVIDER REVIEW</small><strong>Clinically evaluated</strong></p></div><div className="portal-card program-portal"><div className="portal-top"><span>YOUR CARE</span><b>Active</b></div><div className="program-progress"><span></span></div><div className="portal-row"><span>Next check-in</span><strong>Friday</strong></div><div className="portal-row"><span>Provider message</span><strong>1 new</strong></div><div className="portal-row"><span>Order status</span><strong>View</strong></div></div></div>
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
      <img src="/rejuvonix-get-started-group.png" alt="A diverse group of adults smiling together with confidence" />
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

    <footer><div className="footer-main"><div><a className="brand" href="/"><img src="/rejuvonix-logo-mark.png" alt="" />REJUVONIX<span>.</span></a><p>Online access to prescription weight care.</p></div><div><strong>Explore</strong><a href="/treatments">Treatments</a><a href="/how-it-works">How it works</a><a href="/support">The program</a></div><div><strong>Support</strong><a href="/faq">FAQ</a><a href="/safety">Safety</a><a href="/support#contact">Contact</a></div><div><strong>Account</strong><a href="/sign-in">Sign in</a><a href="/get-started">Get started</a><a href="/compounded">Compounded care</a></div></div><div className="medical-disclaimer" id="medical-disclaimer"><strong>Medical and platform disclaimer</strong><p>Rejuvonix is a technology and administrative-services platform and is not a healthcare provider, medical practice, pharmacy, laboratory, drug manufacturer or insurance company. Rejuvonix connects individuals with independent licensed healthcare providers who are solely responsible for clinical evaluations, diagnoses, treatment recommendations and prescribing decisions. If prescribed, medication is dispensed by an independent licensed pharmacy. Compounded medications are not FDA approved. Individual results vary.</p></div><div className="footer-bottom"><span>© 2026 Rejuvonix. All rights reserved.</span><span>Wegovy® is a registered trademark of Novo Nordisk A/S. Zepbound® is a registered trademark of Eli Lilly and Company. Rejuvonix is not affiliated with or endorsed by these companies.</span></div></footer>

    {quizOpen && <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setQuizOpen(false)}><section className="quiz-modal" role="dialog" aria-modal="true" aria-labelledby="quiz-title"><button className="modal-close" onClick={() => setQuizOpen(false)} aria-label="Close">×</button><div className="quiz-brand"><img src="/rejuvonix-logo-mark.png" alt="" />REJUVONIX<span>.</span></div>
      {step < 3 ? <><div className="progress"><span style={{width:`${(step + 1) * 33.33}%`}}></span></div><p className="quiz-step">Question {step + 1} of 3</p><h2 id="quiz-title">{["What would you most like help achieving?","How would you prefer to receive treatment?","Do you plan to use insurance?"][step]}</h2><div className="quiz-options">{[["Lose weight","Control my appetite","Improve metabolic health","Maintain my progress"],["Weekly injection","Daily pill","I’m open to either","Let a provider help me decide"],["Yes","No","I’m not sure"]][step].map(option => <button key={option} onClick={() => choose(option)}>{option}<span>→</span></button>)}</div>{step > 0 && <button className="back-button" onClick={() => setStep(step - 1)}>← Back</button>}</>
      : <div className="quiz-result"><span className="result-mark">✓</span><p className="eyebrow">Your next step</p><h2 id="quiz-title">You may have more than one treatment option.</h2><p>Complete a secure health assessment and connect with a licensed provider to discuss what may be appropriate for you.</p><button className="primary" onClick={() => setQuizOpen(false)}>Continue to assessment</button><button className="secondary" onClick={() => {setQuizOpen(false); document.getElementById("treatments")?.scrollIntoView({behavior:"smooth"});}}>Compare treatments first</button><small>Completing an assessment does not guarantee a prescription.</small></div>}
    </section></div>}
  </main>;
}
