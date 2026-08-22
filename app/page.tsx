"use client";

import { useEffect, useState } from "react";

const treatments = [
  ["Wegovy® Pill", "Semaglutide", "Once-daily pill", "Branded"],
  ["Wegovy® Injection", "Semaglutide", "Once-weekly injection", "Branded"],
  ["Zepbound® Injection", "Tirzepatide", "Once-weekly injection", "Branded"],
  ["Compounded options", "Provider-determined", "When clinically appropriate", "Personalized"],
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
        <a href="#treatments">Treatments</a><a href="#how">How it works</a><a href="#program">The program</a><a href="#safety">Safety</a>
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
      <div className="treatment-grid">{treatments.map(([name,ingredient,format,tag], index) => <article className={`treatment-card card-${index + 1}`} key={name}><div className="card-top"><span>{tag}</span><span>↗</span></div><div className="product-orb"><span>{index < 3 ? "Rx" : "Care"}</span></div><div className="card-content"><p>{ingredient}</p><h3>{name}</h3><span>{format}</span></div></article>)}</div>
      <p className="section-disclaimer">Prescription products require an online consultation with an independent licensed healthcare provider who determines whether a prescription is appropriate. Compounded medications are not FDA approved.</p>
    </section>

    <section className="how-section" id="how">
      <div className="section-heading light"><div><p className="eyebrow">How it works</p><h2>Thoughtful care, without the runaround.</h2></div><p>Rejuvonix brings the steps together while independent providers make every medical decision.</p></div>
      <div className="steps-grid">
        {[["01","Tell us about you","Complete a short eligibility check, then continue to a secure health assessment."],["02","Connect with a provider","An independent licensed provider reviews your information and discusses your options."],["03","Get a personalized decision","Your provider determines whether treatment is appropriate and selects the treatment, if any."],["04","Stay supported","Track next steps, fulfillment status and ongoing program support in one place."]].map(([number,title,copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
      </div>
      <button className="primary aqua" onClick={openQuiz}>Start with a few questions</button>
    </section>

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
