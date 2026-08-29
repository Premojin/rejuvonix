import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { findGoal, goalGroups } from "../../components/service-data";

const pathwaySilhouettes:Record<string,string>={
  "glp-1-injections":"/v6/compounded-medication-generic.png",
  "glp-1-tablets":"/v6/compounded-medication-generic.png",
  "wegovy-pill":"/wegovy-pill.png",
  "wegovy-injection":"/wegovy-injection.png",
  "zepbound-injection":"/zepbound-injection.png",
};

export function generateStaticParams(){ return goalGroups.map(({slug})=>({slug})); }

export default async function GoalPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const goal=findGoal(slug);
  if(!goal) notFound();
  const assessmentRoute=goal.slug==="weight-loss"?"/eligibility/weight-loss":"/eligibility";
  const routeFor=(serviceSlug:string)=>goal.slug==="weight-loss"?assessmentRoute:`/services/${serviceSlug}`;
  return <main className="detail-page goal-page goal-page-v2">
    <SiteHeader/>
    <section className="goal-hero goal-hero-v2">
      <div className="goal-hero-copy-v2"><p className="detail-kicker">Your goals · {goal.name}</p><h1>{goal.name}, shaped around your life.</h1><p>{goal.intro} Explore the category clearly, compare the available paths, and connect with an independent licensed provider when clinical review is appropriate.</p><div className="goal-hero-actions"><Link className="detail-primary" href={assessmentRoute}>Start your assessment</Link><a href="#goal-options">View all pathways ↓</a></div></div>
      <div className="goal-hero-system" aria-hidden="true"><span className="goal-orbit goal-orbit-one"></span><span className="goal-orbit goal-orbit-two"></span><div className="goal-system-word">{goal.name.split(" ")[0]}</div><div className="goal-system-card"><small>YOUR FOCUS</small><strong>{goal.name}</strong><span>{String(goal.services.length).padStart(2,"0")} pathways to explore</span></div></div>
    </section>

    <section className="goal-service-section goal-service-section-v2" id="goal-options">
      <div className="goal-section-heading goal-section-heading-v2"><div><p className="detail-kicker">Featured pathways</p><h2>Explore what fits your goal.</h2></div><p>Each card gives you a clear starting point. Open a pathway to understand the option, what provider review may involve, and the next action available to you.</p></div>
      <div className={`goal-program-stage goal-program-count-${goal.services.length}`}>
        {goal.services.map((service,index)=><Link href={routeFor(service.slug)} className="goal-program-card" key={service.slug}>
          <span className="goal-program-number">{String(index+1).padStart(2,"0")}</span><span className="goal-program-type">{index===0?"Start here":"Explore next"}</span>{pathwaySilhouettes[service.slug]&&<span className="goal-product-silhouette" aria-hidden="true"><img src={pathwaySilhouettes[service.slug]} alt=""/></span>}<div className="goal-program-copy"><h3>{service.name}</h3><p>{service.note}</p></div><span className="goal-program-link">Open pathway <b>→</b></span><i aria-hidden="true"></i>
        </Link>)}
      </div>
      <div className="goal-program-legend" aria-label="How to use the pathway cards"><span><i></i>Choose a pathway</span><span><i></i>Review the details</span><span><i></i>Continue when ready</span></div>
    </section>

    <section className="goal-care-path goal-care-path-v2">
      <div className="goal-care-intro"><p className="detail-kicker">A connected experience</p><h2>Education first. Personalized choices next.</h2><p>Rejuvonix organizes the information so you can understand the pathway before sharing health information or speaking with a provider. Clinical decisions remain with independent licensed providers.</p><Link href={goal.slug==="weight-loss"?assessmentRoute:"/how-it-works"}>{goal.slug==="weight-loss"?"Continue to the weight loss assessment →":"See how the complete process works →"}</Link></div>
      <ol>
        <li><span>01</span><div><span className="goal-stage-label">Orient</span><h3>Choose the goal that matters now.</h3><p>Begin with the outcome, concern, or daily change you want to understand.</p></div></li>
        <li><span>02</span><div><span className="goal-stage-label">Learn</span><h3>Compare the available pathways.</h3><p>Review the format, purpose, practical considerations, and safety information before moving forward.</p></div></li>
        <li><span>03</span><div><span className="goal-stage-label">Share</span><h3>Complete the appropriate assessment.</h3><p>Provide the health history and current information required for that pathway.</p></div></li>
        <li><span>04</span><div><span className="goal-stage-label">Review</span><h3>Receive independent clinical guidance.</h3><p>When medical care is involved, a licensed provider determines eligibility and the appropriate next step. Treatment is never guaranteed.</p></div></li>
      </ol>
    </section>
    <SiteFooter/>
  </main>;
}
