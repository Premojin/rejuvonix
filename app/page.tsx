"use client";

import { useEffect, useState } from "react";

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

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  useEffect(() => { const timer = window.setTimeout(() => setQuizOpen(true), 12000); return () => window.clearTimeout(timer); }, []);
  const openQuiz = () => { setStep(0); setAnswers([]); setQuizOpen(true); };
  const choose = (answer: string) => { const next = [...answers]; next[step] = answer; setAnswers(next); setStep(Math.min(step + 1, 3)); };

  return <main>
    <div className="announcement"><span>Online access to prescription weight care</span><button onClick={openQuiz}>Check eligibility <b>→</b></button></div>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Rejuvonix home"><img src="/rejuvonix-logo-mark.png" alt="" />REJUVONIX<span>.</span></a>
      <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Primary navigation">
        <a href="#treatments">Treatments</a><a href="#compounded">Compounded</a><a href="#journey">How it works</a><a href="#program">Support</a>
      </nav>
      <div className="header-actions"><button className="text-button">Sign in</button><button className="primary small" onClick={openQuiz}>Get started</button><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu"><span></span><span></span></button></div>
    </header>

    <section className="hero" id="top">
      <div className="hero-content"><p className="eyebrow">Prescription weight care online</p><h1>Weight care that fits into your life.</h1><p className="hero-copy">Review GLP-1 treatment options, complete a health assessment and connect with a licensed provider online.</p><div className="hero-actions"><button className="primary" onClick={openQuiz}>Check my eligibility</button><a className="secondary" href="#treatments">View treatments</a></div><p className="microcopy">There is no commitment. A provider decides whether treatment is appropriate.</p></div>
      <div className="hero-visual" role="img" aria-label="A woman enjoying a bright morning at home"><div className="hero-stat"><span>Online weight care</span><strong>on your schedule</strong><small>Provider access · follow-up support</small></div></div>
    </section>

    <section className="trust-strip" aria-label="Program highlights">
      {[["✓","Licensed providers","Independent clinical review"],["⌁","100% online","From assessment to follow-up"],["◇","Clear next steps","No guesswork, no pressure"],["↗","Discreet delivery","If prescribed and fulfilled"]].map(([icon,title,copy]) => <div key={title}><span className="trust-icon">{icon}</span><p><strong>{title}</strong><br/>{copy}</p></div>)}
    </section>

    <section className="section-shell" id="treatments">
      <div className="section-heading"><div><p className="eyebrow">Treatment options</p><h2>Find out which option may be right for you.</h2></div><p>A provider reviews your health history, preferences and goals before recommending treatment.</p></div>
      <div className="treatment-grid branded-grid">{treatments.map((item, index) => <article className={`treatment-card card-${index + 1}`} key={item.name}><div className="card-top"><span>{item.tag}</span><span>0{index + 1}</span></div><div className="product-stage"><img src={item.image} alt={`${item.name} product packaging`} /></div><div className="card-content"><p>{item.ingredient}</p><h3>{item.name}</h3><span>{item.format}</span><button onClick={openQuiz}>Check eligibility <b>→</b></button></div></article>)}</div>
      <p className="section-disclaimer">Prescription products require an online consultation with an independent licensed healthcare provider who determines whether a prescription is appropriate. Compounded medications are not FDA approved.</p>
    </section>

    <section className="care-feature">
      <div className="care-feature-photo"><img src="/rejuvonix-member-phone.png" alt="A member using the Rejuvonix platform at home" /><div className="photo-caption"><span>ONLINE ACCESS</span><strong>Care from home</strong></div></div>
      <div className="care-feature-copy"><p className="eyebrow">More than a prescription</p><h2>Keep your care close, even on busy days.</h2><p>Use Rejuvonix to complete your assessment, follow your order and stay current with provider check-ins.</p><div className="care-points"><div><span>01</span><strong>Start online</strong><p>Complete the health assessment when it works for you.</p></div><div><span>02</span><strong>Follow each step</strong><p>See provider review and pharmacy fulfillment updates.</p></div><div><span>03</span><strong>Stay connected</strong><p>Return for check-ins and ongoing treatment support.</p></div></div><button className="primary" onClick={openQuiz}>Check my eligibility</button></div>
    </section>

    <section className="compounded-section" id="compounded">
      <div className="compounded-intro"><p className="eyebrow">Compounded medications</p><h2>Compare semaglutide and tirzepatide.</h2><p>An independent provider may prescribe a compounded medication when it is legally available and appropriate for the patient. Compounded medications are not generic versions of branded drugs, and they are not FDA approved.</p></div>
      <div className="glance-grid">
        <article className="glance-card semaglutide"><div className="glance-number">01</div><p className="pill-label">Compounded option</p><h3>Semaglutide</h3><p className="glance-sub">Acts on the GLP-1 receptor.</p><dl><div><dt>Typical format</dt><dd>Injection*</dd></div><div><dt>Schedule</dt><dd>Set by provider</dd></div><div><dt>Clinical review</dt><dd>Required</dd></div><div><dt>FDA status</dt><dd>Not FDA approved</dd></div></dl><button onClick={openQuiz}>Check eligibility <span>→</span></button></article>
        <article className="glance-card tirzepatide"><div className="glance-number">02</div><p className="pill-label">Compounded option</p><h3>Tirzepatide</h3><p className="glance-sub">Acts on the GIP and GLP-1 receptors.</p><dl><div><dt>Typical format</dt><dd>Injection*</dd></div><div><dt>Schedule</dt><dd>Set by provider</dd></div><div><dt>Clinical review</dt><dd>Required</dd></div><div><dt>FDA status</dt><dd>Not FDA approved</dd></div></dl><button onClick={openQuiz}>Check eligibility <span>→</span></button></article>
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
      <div className="review-heading"><p className="eyebrow">Patient reviews</p><h2>What patients are saying.</h2></div>
      <div className="review-grid">
        {[1,2,3,4,5,6].map((slot) => <article className="review-card" key={slot}>
          <div className="review-photo" role="img" aria-label="Patient photo placeholder"><span className="photo-mark">+</span><strong>[Patient photo]</strong><small>0{slot}</small></div>
          <div className="review-content">
            <div className="review-stars" aria-label="Five star rating">★★★★★</div>
            <div className="review-copy"><h3>[Review headline]</h3><p>[Patient review]</p></div>
            <div className="review-author"><div><strong>[Patient name]</strong><span>[Treatment]</span></div><time>[Date]</time></div>
          </div>
        </article>)}
      </div>
    </section>

    <section className="program-section" id="program">
      <div className="program-copy"><p className="eyebrow">The Rejuvonix program</p><h2>Your care, organized in one place.</h2><p>Use the platform for your assessment, order updates, progress check-ins and maintenance conversations.</p><div className="benefit-list">{["Secure online assessment","Access to independent licensed providers","Treatment and fulfillment status","Progress check-ins","Nutrition and movement guidance","Maintenance planning"].map(item => <div key={item}><span>✓</span>{item}</div>)}</div><button className="primary" onClick={openQuiz}>Review my options</button></div>
      <div className="program-visual"><div className="program-glow"></div><div className="program-status status-one"><span>01</span><p><small>ASSESSMENT</small><strong>Secure and online</strong></p></div><div className="program-status status-two"><span>02</span><p><small>PROVIDER REVIEW</small><strong>Clinically evaluated</strong></p></div><div className="portal-card program-portal"><div className="portal-top"><span>YOUR CARE</span><b>Active</b></div><div className="program-progress"><span></span></div><div className="portal-row"><span>Next check-in</span><strong>Friday</strong></div><div className="portal-row"><span>Provider message</span><strong>1 new</strong></div><div className="portal-row"><span>Order status</span><strong>View</strong></div></div></div>
    </section>

    <section className="clinical-section" id="safety">
      <div><p className="eyebrow">Independent clinical care</p><h2>A licensed provider reviews every assessment.</h2></div>
      <div className="clinical-copy"><p>Rejuvonix connects you with independent licensed healthcare providers. The provider reviews your health information and decides whether a prescription is appropriate.</p><a href="#faq">Read common questions <span>→</span></a></div>
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

    <footer><div className="footer-main"><div><a className="brand" href="#top"><img src="/rejuvonix-logo-mark.png" alt="" />REJUVONIX<span>.</span></a><p>Online access to prescription weight care.</p></div><div><strong>Explore</strong><a href="#treatments">Treatments</a><a href="#journey">How it works</a><a href="#program">The program</a></div><div><strong>Support</strong><a href="#faq">FAQ</a><a href="#safety">Safety</a><a href="#">Contact</a></div><div><strong>Legal</strong><a href="#medical-disclaimer">Medical disclaimer</a><a href="#">Terms</a><a href="#">Privacy</a></div></div><div className="medical-disclaimer" id="medical-disclaimer"><strong>Medical and platform disclaimer</strong><p>Rejuvonix is a technology and administrative-services platform and is not a healthcare provider, medical practice, pharmacy, laboratory, drug manufacturer or insurance company. Rejuvonix connects individuals with independent licensed healthcare providers who are solely responsible for clinical evaluations, diagnoses, treatment recommendations and prescribing decisions. If prescribed, medication is dispensed by an independent licensed pharmacy. Compounded medications are not FDA approved. Individual results vary.</p></div><div className="footer-bottom"><span>© 2026 Rejuvonix. All rights reserved.</span><span>Wegovy® is a registered trademark of Novo Nordisk A/S. Zepbound® is a registered trademark of Eli Lilly and Company. Rejuvonix is not affiliated with or endorsed by these companies.</span></div></footer>

    {quizOpen && <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setQuizOpen(false)}><section className="quiz-modal" role="dialog" aria-modal="true" aria-labelledby="quiz-title"><button className="modal-close" onClick={() => setQuizOpen(false)} aria-label="Close">×</button><div className="quiz-brand"><img src="/rejuvonix-logo-mark.png" alt="" />REJUVONIX<span>.</span></div>
      {step < 3 ? <><div className="progress"><span style={{width:`${(step + 1) * 33.33}%`}}></span></div><p className="quiz-step">Question {step + 1} of 3</p><h2 id="quiz-title">{["What would you most like help achieving?","How would you prefer to receive treatment?","Do you plan to use insurance?"][step]}</h2><div className="quiz-options">{[["Lose weight","Control my appetite","Improve metabolic health","Maintain my progress"],["Weekly injection","Daily pill","I’m open to either","Let a provider help me decide"],["Yes","No","I’m not sure"]][step].map(option => <button key={option} onClick={() => choose(option)}>{option}<span>→</span></button>)}</div>{step > 0 && <button className="back-button" onClick={() => setStep(step - 1)}>← Back</button>}</>
      : <div className="quiz-result"><span className="result-mark">✓</span><p className="eyebrow">Your next step</p><h2 id="quiz-title">You may have more than one treatment option.</h2><p>Complete a secure health assessment and connect with a licensed provider to discuss what may be appropriate for you.</p><button className="primary" onClick={() => setQuizOpen(false)}>Continue to assessment</button><button className="secondary" onClick={() => {setQuizOpen(false); document.getElementById("treatments")?.scrollIntoView({behavior:"smooth"});}}>Compare treatments first</button><small>Completing an assessment does not guarantee a prescription.</small></div>}
    </section></div>}
  </main>;
}
