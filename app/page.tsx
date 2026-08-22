"use client";

import { useEffect, useState } from "react";

const treatments = [
  {name:"Wegovy® Pill", ingredient:"Semaglutide", format:"Once-daily tablet", image:"https://www.findhonestcare.com/images/wegovy-pill.png", theme:"mint"},
  {name:"Wegovy® Injection", ingredient:"Semaglutide", format:"Once-weekly injection", image:"https://cdn.euroclinix.net/images/en/product/2/wegovy-L-.jpg", theme:"silver"},
  {name:"Zepbound® Injection", ingredient:"Tirzepatide", format:"Once-weekly injection", image:"https://www.lilly.com/lillydirect/ZEPBOUND_All_Standing-cropped.png", theme:"cream"},
];

const journey = [
  ["01","Explore","Compare branded and compounded pathways in plain language."],
  ["02","Check eligibility","Answer a few introductory questions—without commitment."],
  ["03","Share your health history","Complete a secure, detailed medical assessment."],
  ["04","Provider review","An independent licensed provider reviews your information."],
  ["05","Receive a care decision","If appropriate, your provider selects and prescribes treatment."],
  ["06","Pharmacy fulfillment","A licensed pharmacy prepares and ships prescribed medication."],
  ["07","Keep moving forward","Complete check-ins, message your care team and track next steps."],
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
    <div className="announcement"><span>Personalized weight care, from wherever you are.</span><button onClick={openQuiz}>See if you may qualify <b>→</b></button></div>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Rejuvonix home">REJUVONIX<span>.</span></a>
      <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Primary navigation">
        <a href="#treatments">Treatments</a><a href="#compounded">Compounded</a><a href="#journey">How it works</a><a href="#program">Support</a>
      </nav>
      <div className="header-actions"><button className="text-button">Sign in</button><button className="primary small" onClick={openQuiz}>Get started</button><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu"><span></span><span></span></button></div>
    </header>

    <section className="hero" id="top">
      <div className="hero-content"><p className="eyebrow">Doctor-guided weight care</p><h1>Weight loss care that finally feels made for you.</h1><p className="hero-copy">Explore GLP-1 treatment options and connect with a licensed provider—all through one clear, supportive experience.</p><div className="hero-actions"><button className="primary" onClick={openQuiz}>See if I may qualify</button><a className="secondary" href="#treatments">Explore treatments</a></div><p className="microcopy">No commitment required. A provider determines whether treatment is appropriate.</p></div>
      <div className="hero-visual" role="img" aria-label="A confident woman enjoying a bright, healthy morning at home"><div className="hero-stat"><span>Care built around</span><strong>your goals</strong><small>Provider access · ongoing support</small></div></div>
    </section>

    <section className="trust-strip" aria-label="Program highlights">
      {[["✓","Licensed providers","Independent clinical review"],["⌁","100% online","From assessment to follow-up"],["◇","Clear next steps","No guesswork, no pressure"],["↗","Discreet delivery","If prescribed and fulfilled"]].map(([icon,title,copy]) => <div key={title}><span className="trust-icon">{icon}</span><p><strong>{title}</strong><br/>{copy}</p></div>)}
    </section>

    <section className="section-shell" id="treatments">
      <div className="section-heading"><div><p className="eyebrow">Treatment options</p><h2>One goal. More than one way forward.</h2></div><p>Your provider considers your health history, preferences and goals before determining what may be appropriate.</p></div>
      <div className="treatment-grid branded-grid">{treatments.map((item, index) => <article className={`treatment-card card-${index + 1}`} key={item.name}><div className="card-top"><span>FDA-approved branded medication</span><span>0{index + 1}</span></div><div className="product-stage"><img src={item.image} alt={`${item.name} product packaging`} /></div><div className="card-content"><p>{item.ingredient}</p><h3>{item.name}</h3><span>{item.format}</span><button onClick={openQuiz}>See if I may qualify <b>→</b></button></div></article>)}</div>
      <p className="section-disclaimer">Prescription products require an online consultation with an independent licensed healthcare provider who determines whether a prescription is appropriate. Compounded medications are not FDA approved.</p>
    </section>

    <section className="compounded-section" id="compounded">
      <div className="compounded-intro"><p className="eyebrow">Compounded care at a glance</p><h2>Two pathways. One provider-led decision.</h2><p>When a compounded medication is legally available and clinically appropriate, an independent provider may consider a patient-specific prescription. It is not a generic or FDA-approved substitute for a branded drug.</p></div>
      <div className="glance-grid">
        <article className="glance-card semaglutide"><div className="glance-number">01</div><p className="pill-label">Compounded option</p><h3>Semaglutide</h3><p className="glance-sub">A GLP-1 pathway, considered individually.</p><dl><div><dt>Typical format</dt><dd>Injection*</dd></div><div><dt>Schedule</dt><dd>Provider directed</dd></div><div><dt>Clinical review</dt><dd>Required</dd></div><div><dt>FDA status</dt><dd>Not FDA approved</dd></div></dl><button onClick={openQuiz}>Explore this pathway <span>→</span></button></article>
        <article className="glance-card tirzepatide"><div className="glance-number">02</div><p className="pill-label">Compounded option</p><h3>Tirzepatide</h3><p className="glance-sub">A GIP and GLP-1 pathway, considered individually.</p><dl><div><dt>Typical format</dt><dd>Injection*</dd></div><div><dt>Schedule</dt><dd>Provider directed</dd></div><div><dt>Clinical review</dt><dd>Required</dd></div><div><dt>FDA status</dt><dd>Not FDA approved</dd></div></dl><button onClick={openQuiz}>Explore this pathway <span>→</span></button></article>
      </div><p className="compounded-note">*Form, ingredients, concentration and availability vary by prescription and dispensing pharmacy. Compounded medications are prepared for an identified patient and are not reviewed by FDA for safety, effectiveness or quality before marketing.</p>
    </section>

    <section className="human-story">
      <div className="story-image story-main"><img src="/rejuvonix-movement.png" alt="Woman enjoying a walk outdoors" /></div>
      <div className="story-copy"><p className="eyebrow">Care for real life</p><h2>There is a human behind every health goal.</h2><p>That is why the experience is designed to feel clear, private and supportive—from the first question through ongoing check-ins.</p><div className="story-stat"><strong>One connected experience</strong><span>Assessment · provider · pharmacy · follow-up</span></div></div>
      <div className="story-image story-side"><img src="/rejuvonix-lifestyle.png" alt="Couple preparing a healthy meal together" /></div>
    </section>

    <section className="how-section" id="journey">
      <div className="section-heading light"><div><p className="eyebrow">Your journey, start to finish</p><h2>Know what happens next. Every step of the way.</h2></div><p>Rejuvonix organizes the experience while independent providers and pharmacies remain responsible for clinical care and fulfillment.</p></div>
      <div className="journey-layout"><div className="journey-photo"><img src="/rejuvonix-clinician.png" alt="Clinician speaking with a patient by video" /><span>Private, provider-led care</span></div><div className="journey-steps">{journey.map(([number,title,copy]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div>
      <button className="primary aqua" onClick={openQuiz}>Start with a few questions</button>
    </section>

    <section className="reviews-section" id="reviews"><div className="review-heading"><p className="eyebrow">Patient experience</p><h2>Trust is earned, not invented.</h2><p>Verified Rejuvonix patient reviews will appear here as they are collected after launch. We will never publish fabricated testimonials or imply outcomes that are not supported.</p></div><div className="review-promise"><div><span>01</span><h3>Verified feedback only</h3><p>Reviews will be tied to genuine platform experiences.</p></div><div><span>02</span><h3>All perspectives welcome</h3><p>Positive, neutral and critical feedback will be treated fairly.</p></div><div><span>03</span><h3>No outcome promises</h3><p>Individual experiences vary and do not predict clinical results.</p></div></div></section>

    <section className="program-section" id="program">
      <div className="program-copy"><p className="eyebrow">The Rejuvonix program</p><h2>Medication may be one part. Support is the whole plan.</h2><p>Our platform helps keep the experience organized—from your first assessment to progress check-ins and maintenance conversations.</p><div className="benefit-list">{["Secure online assessment","Access to independent licensed providers","Treatment and fulfillment status","Progress check-ins","Nutrition and movement guidance","Maintenance planning"].map(item => <div key={item}><span>✓</span>{item}</div>)}</div><button className="primary" onClick={openQuiz}>Explore my options</button></div>
      <div className="program-panel"><div className="portal-card"><div className="portal-top"><span>YOUR PROGRESS</span><b>Week 8</b></div><div className="progress-ring"><strong>On track</strong><small>Keep going</small></div><div className="portal-row"><span>Next check-in</span><strong>Friday</strong></div><div className="portal-row"><span>Provider message</span><strong>1 new</strong></div><div className="portal-row"><span>Weekly goal</span><strong>3 of 4</strong></div></div><p>A clearer view of your journey.</p></div>
    </section>

    <section className="clinical-section" id="safety">
      <div><p className="eyebrow">Independent clinical care</p><h2>The right treatment starts with the right decision.</h2></div>
      <div className="clinical-copy"><p>Rejuvonix is the platform that connects you with independent licensed healthcare providers. Your provider—not an algorithm or sales team—reviews your health information and determines whether a prescription is appropriate.</p><a href="#faq">Read common questions <span>→</span></a></div>
    </section>

    <section className="faq-section" id="faq"><div className="faq-intro"><p className="eyebrow">Good questions, clear answers</p><h2>Before you get started.</h2></div><div className="faq-list">
      <details><summary>Does completing the assessment guarantee a prescription?<span>+</span></summary><p>No. An independent licensed healthcare provider reviews your information and determines whether any treatment is medically appropriate.</p></details>
      <details><summary>Which branded treatments are featured?<span>+</span></summary><p>Rejuvonix currently features Wegovy® Pill, Wegovy® Injection and Zepbound® Injection. Availability is subject to provider determination, partner access, state rules and supply.</p></details>
      <details><summary>Are compounded medications FDA approved?<span>+</span></summary><p>No. Compounded medications are not FDA approved, and FDA does not review them for safety, effectiveness or quality before they are marketed. A provider determines whether a patient-specific compounded option is appropriate and legally available.</p></details>
      <details><summary>Is Rejuvonix a healthcare provider or pharmacy?<span>+</span></summary><p>Rejuvonix is a technology and administrative-services platform. Medical care is provided by independent licensed healthcare professionals, and medication is dispensed by independent licensed pharmacies.</p></details>
    </div></section>

    <section className="closing-cta"><p className="eyebrow">Your next step</p><h2>See what weight care could look like for you.</h2><button className="primary" onClick={openQuiz}>Check my eligibility</button><small>Takes just a few minutes. No prescription is guaranteed.</small></section>

    <footer><div className="footer-main"><div><a className="brand" href="#top">REJUVONIX<span>.</span></a><p>A clearer path to personalized weight care.</p></div><div><strong>Explore</strong><a href="#treatments">Treatments</a><a href="#how">How it works</a><a href="#program">The program</a></div><div><strong>Support</strong><a href="#faq">FAQ</a><a href="#safety">Safety</a><a href="#">Contact</a></div><div><strong>Legal</strong><a href="#medical-disclaimer">Medical disclaimer</a><a href="#">Terms</a><a href="#">Privacy</a></div></div><div className="medical-disclaimer" id="medical-disclaimer"><strong>Medical and platform disclaimer</strong><p>Rejuvonix is a technology and administrative-services platform and is not a healthcare provider, medical practice, pharmacy, laboratory, drug manufacturer or insurance company. Rejuvonix connects individuals with independent licensed healthcare providers who are solely responsible for clinical evaluations, diagnoses, treatment recommendations and prescribing decisions. If prescribed, medication is dispensed by an independent licensed pharmacy. Compounded medications are not FDA approved. Individual results vary.</p></div><div className="footer-bottom"><span>© 2026 Rejuvonix. All rights reserved.</span><span>Wegovy® is a registered trademark of Novo Nordisk A/S. Zepbound® is a registered trademark of Eli Lilly and Company. Rejuvonix is not affiliated with or endorsed by these companies.</span></div></footer>

    {quizOpen && <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setQuizOpen(false)}><section className="quiz-modal" role="dialog" aria-modal="true" aria-labelledby="quiz-title"><button className="modal-close" onClick={() => setQuizOpen(false)} aria-label="Close">×</button><div className="quiz-brand">REJUVONIX<span>.</span></div>
      {step < 3 ? <><div className="progress"><span style={{width:`${(step + 1) * 33.33}%`}}></span></div><p className="quiz-step">Question {step + 1} of 3</p><h2 id="quiz-title">{["What would you most like help achieving?","How would you prefer to receive treatment?","Do you plan to use insurance?"][step]}</h2><div className="quiz-options">{[["Lose weight","Control my appetite","Improve metabolic health","Maintain my progress"],["Weekly injection","Daily pill","I’m open to either","Let a provider help me decide"],["Yes","No","I’m not sure"]][step].map(option => <button key={option} onClick={() => choose(option)}>{option}<span>→</span></button>)}</div>{step > 0 && <button className="back-button" onClick={() => setStep(step - 1)}>← Back</button>}</>
      : <div className="quiz-result"><span className="result-mark">✓</span><p className="eyebrow">Your next step</p><h2 id="quiz-title">You may have more than one treatment option.</h2><p>Complete a secure health assessment and connect with a licensed provider to discuss what may be appropriate for you.</p><button className="primary" onClick={() => setQuizOpen(false)}>Continue to assessment</button><button className="secondary" onClick={() => {setQuizOpen(false); document.getElementById("treatments")?.scrollIntoView({behavior:"smooth"});}}>Compare treatments first</button><small>Completing an assessment does not guarantee a prescription.</small></div>}
    </section></div>}
  </main>;
}
