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

    {quizOpen && <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setQuizOpen(false)}><section className="quiz-modal" role="dialog" aria-modal="true" aria-labelledby="quiz-title"><button className="modal-close" onClick={() => setQuizOpen(false)} aria-label="Close">×</button><div className="quiz-brand">REJUVONIX<span>.</span></div>
      {step < 3 ? <><div className="progress"><span style={{width:`${(step + 1) * 33.33}%`}}></span></div><p className="quiz-step">Question {step + 1} of 3</p><h2 id="quiz-title">{["What would you most like help achieving?","How would you prefer to receive treatment?","Do you plan to use insurance?"][step]}</h2><div className="quiz-options">{[["Lose weight","Control my appetite","Improve metabolic health","Maintain my progress"],["Weekly injection","Daily pill","I’m open to either","Let a provider help me decide"],["Yes","No","I’m not sure"]][step].map(option => <button key={option} onClick={() => choose(option)}>{option}<span>→</span></button>)}</div>{step > 0 && <button className="back-button" onClick={() => setStep(step - 1)}>← Back</button>}</>
      : <div className="quiz-result"><span className="result-mark">✓</span><p className="eyebrow">Your next step</p><h2 id="quiz-title">You may have more than one treatment option.</h2><p>Complete a secure health assessment and connect with a licensed provider to discuss what may be appropriate for you.</p><button className="primary" onClick={() => setQuizOpen(false)}>Continue to assessment</button><button className="secondary" onClick={() => {setQuizOpen(false); document.getElementById("treatments")?.scrollIntoView({behavior:"smooth"});}}>Compare treatments first</button><small>Completing an assessment does not guarantee a prescription.</small></div>}
    </section></div>}
  </main>;
}
