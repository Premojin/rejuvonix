import Link from "next/link";

const programs = [
  {slug:"weight-loss",name:"Weight Loss",copy:"Weight-management goals, starting measurements and care preferences.",image:"/program-weight-loss-concern.webp"},
  {slug:"performance",name:"Performance",copy:"Energy, strength, recovery and sustainable performance goals.",image:"/program-performance-runners.webp"},
  {slug:"sexual-health",name:"Sexual Health",copy:"A private starting point for connection, confidence and sexual wellness.",image:"/program-sexual-health-silhouette.webp"},
  {slug:"hair-restoration",name:"Hair Restoration",copy:"Hair concerns, priorities and the kind of support you are seeking.",image:"/program-hair-restoration-silhouette.webp"},
  {slug:"skin-restoration",name:"Skin Restoration",copy:"Skin goals, current priorities and provider-guided care interests.",image:"/program-skin-rejuvenation-silhouette.webp"},
];

export default function EligibilityProgramSelector(){
  return <main className="eligibility-page selector-page">
    <a className="skip-link" href="#program-options">Skip to program options</a>
    <header className="eligibility-header"><Link className="eligibility-brand" href="/" aria-label="Rejuvonix home"><img src="/rejuvonix-logo-mark.png" alt=""/>REJUVONIX<span>.</span></Link><span>Choose your starting point</span></header>
    <section className="selector-shell" id="program-options">
      <div className="selector-heading"><p className="eligibility-kicker">Your assessment</p><h1>What would you like support with?</h1><p>Choose one area to begin. Your answers help organize the right questions, but they do not guarantee treatment or a prescription.</p></div>
      <div className="selector-grid">{programs.map(program=><Link href={`/eligibility/${program.slug}`} className="selector-card" key={program.slug}><img src={program.image} alt=""/><span><small>Explore</small><strong>{program.name}</strong><p>{program.copy}</p><b>Begin assessment →</b></span></Link>)}</div>
      <p className="selector-safety">A licensed prescriber determines whether treatment may be appropriate after reviewing the information required for your selected program. For a medical emergency, call 911 or seek immediate in-person care.</p>
    </section>
  </main>;
}
