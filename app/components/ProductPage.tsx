"use client";

import { useState } from "react";
import Link from "next/link";
import { Product, products } from "./product-data";
import { SiteFooter, SiteHeader } from "./SiteChrome";
import { CareJourney } from "./CareJourney";

export function ProductPage({product}: {product: Product}) {
  const [stage,setStage] = useState(0);
  const related = products.filter(item => item.slug !== product.slug).slice(0,3);
  const careImage = ({
    "glp-1-injections":"/care-glp-injections.png",
    "glp-1-tablets":"/care-glp-tablets.png",
    "zepbound-injection":"/care-zepbound.png",
  } as Record<string,string>)[product.slug] || product.heroImage;
  const stageViews = [
    {image:product.image,alt:`${product.name} product packaging`,label:"Treatment",kind:"product"},
    {image:product.heroImage,alt:"A Rejuvonix member enjoying an everyday routine",label:"Lifestyle",kind:"life"},
    {image:careImage,alt:"A licensed clinician reviewing a care plan",label:"Care",kind:"care"},
  ];
  return <main className={`detail-page product-experience product-${product.slug}`}>
    <SiteHeader />
    <nav className="product-page-nav" aria-label={`${product.shortName} page sections`}><a href="#overview">Overview</a><a href="#details">Details</a><a href="#care">Care</a><a href="#compare">Compare</a><a href="#important-safety">Safety</a></nav>
    <section className="product-hero-detail" id="overview">
      <div className="product-hero-copy"><p className="detail-kicker">{product.status}</p><h1>{product.name}</h1><p className="product-ingredient">with {product.ingredient}</p><ul>{product.highlights.map(item => <li key={item}>{item}</li>)}</ul><Link className="detail-primary" href="/eligibility">Check eligibility</Link><Link className="safety-link" href="#important-safety">Important safety information</Link></div>
      <div className={`product-hero-product stage-${stageViews[stage].kind}`}><div className="product-aura"></div><div className="product-stage-number">0{stage+1}</div><img src={stageViews[stage].image} alt={stageViews[stage].alt} /><span>{stage===0?product.cadence:stageViews[stage].label}</span><div className="product-view-switcher" aria-label="Change product view">{stageViews.map((view,index)=><button key={view.label} className={stage===index?"active":""} onClick={()=>setStage(index)} aria-label={`Show ${view.label.toLowerCase()} view`} aria-pressed={stage===index}><i></i><small>{view.label}</small></button>)}</div></div>
    </section>
    <div className="product-marquee" aria-label="Treatment highlights"><span>{product.format}</span><i>•</i><span>{product.cadence}</span><i>•</i><span>Provider reviewed</span><i>•</i><span>Connected care</span></div>
    <section className="product-meet" id="details"><div className="product-meet-image"><img src={product.heroImage} alt="A Rejuvonix member enjoying a healthy everyday routine" /></div><div className="product-meet-copy"><p className="detail-kicker">Meet {product.shortName}</p><h2>Prescription care designed to fit real life.</h2><p>{product.intro}</p><div className="product-info-columns"><div><h3>About the treatment</h3>{product.ingredientPoints.map(item => <p key={item}>✓ {item}</p>)}</div><div><h3>How to take it</h3>{product.directions.map(item => <p key={item}>✓ {item}</p>)}</div></div><Link className="detail-primary" href="/eligibility">Get started</Link></div></section>
    <section className="power-section"><div className="power-heading"><p className="detail-kicker">Treatment at a glance</p><h2>{product.featureTitle}</h2></div><div className="power-grid">{product.features.map((feature,index) => <article key={feature.title}><span>0{index+1}</span><div className="power-image"><img src={[product.image,careImage,product.heroImage][index]} alt={`${feature.title} for ${product.shortName}`} /></div><h3>{feature.title}</h3><p>{feature.copy}</p></article>)}</div></section>
    <section className="journey-page" id="care"><div className="journey-page-heading"><p className="detail-kicker">The nine-stage journey</p><h2>From program selection to reassessment.</h2><p>Rejuvonix previews every stage while independent providers and pharmacies remain responsible for clinical care and fulfillment.</p></div><CareJourney/></section>
    <section className="membership-detail"><div><p className="detail-kicker">Complete support</p><h2>More than medication.</h2><p>Keep assessment details, provider messages, fulfillment updates, progress check-ins and lifestyle guidance together when the clinical integration is active.</p><Link className="detail-primary dark" href="/support">Explore the planned program</Link></div><div className="membership-photo"><img src={careImage} alt={product.shortName} /></div><div className="membership-list">{["Personalized treatment plan","Provider messaging","Order and fulfillment updates","Progress check-ins","Nutrition and movement guidance"].map(item => <p key={item}><span>✓</span>{item}</p>)}</div></section>
    <section className="compare-detail" id="compare"><div className="compare-heading"><p className="detail-kicker">Compare options</p><h2>Which treatment may be right for you?</h2><p>A licensed provider reviews your intake and determines what is medically appropriate.</p></div><div className="compare-grid">{related.map(item => <article key={item.slug}><div><img src={item.image} alt={`${item.name} packaging`} /></div><p>{item.status}</p><h3>{item.name}</h3><dl><dt>Format</dt><dd>{item.format}</dd><dt>Schedule</dt><dd>{item.cadence}</dd><dt>Ingredient</dt><dd>{item.ingredient}</dd></dl><Link href={`/treatments/${item.slug}`}>View details →</Link></article>)}</div><Link className="detail-secondary" href="/treatments">View all treatments</Link></section>
    <section className="future-banner"><img src={product.heroImage} alt={product.shortName} /><div><p className="detail-kicker">Care for the long term</p><h2>Build a plan you can understand and follow.</h2><Link className="detail-primary" href="/eligibility">Check eligibility</Link></div></section>
    <section className="safety-detail" id="important-safety"><div><p className="detail-kicker">Important safety information</p><h2>Know the risks before treatment.</h2></div><div><p>{product.safety}</p><p>Tell your provider about all medical conditions, allergies, pregnancy plans, and every prescription, over-the-counter medicine and supplement you use. Seek urgent care for a medical emergency.</p><p>{product.labelUrl?<a href={product.labelUrl} target="_blank" rel="noreferrer">Official FDA Prescribing Information (PDF) ↗</a>:<a href="https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers" target="_blank" rel="noreferrer">FDA compounding questions and answers ↗</a>}</p><Link href="/safety">Read the safety overview →</Link></div></section>
    <section className="detail-faq"><div><p className="detail-kicker">Frequently asked questions</p><h2>Common questions about {product.shortName}.</h2></div><div>{[[`Is ${product.shortName} guaranteed after the assessment?`,"No. A licensed provider decides whether treatment is appropriate."],["How is my dose selected?","Your provider selects the prescription and adjusts it only when clinically appropriate."],["Where does medication come from?","If prescribed, an independent licensed pharmacy dispenses and ships the medication."],["Can I ask questions after starting?","Yes. Use the platform for provider messages and required follow-up." ]].map(([question,answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>
    <section className="detail-closing"><p className="detail-kicker">Get started</p><h2>Find out which option may fit your health needs.</h2><Link className="detail-primary" href="/eligibility">Start the assessment</Link><small>A prescription is not guaranteed.</small></section>
    <SiteFooter />
  </main>;
}
