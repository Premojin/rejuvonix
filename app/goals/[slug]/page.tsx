import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { findGoal, goalGroups } from "../../components/service-data";

export function generateStaticParams(){ return goalGroups.map(({slug})=>({slug})); }

export default async function GoalPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const goal=findGoal(slug);
  if(!goal) notFound();
  return <main className="detail-page goal-page"><SiteHeader/><section className="goal-hero"><div><p className="detail-kicker">Your goals · {goal.name}</p><h1>{goal.name}, shaped around your life.</h1><p>{goal.intro} Begin with clear education, then connect with an independent licensed provider when clinical review is appropriate.</p><Link className="detail-primary" href="/eligibility">Explore your options</Link></div><div className="goal-hero-mark" aria-hidden="true"><span>{goal.name.split(" ")[0]}</span></div></section><section className="goal-service-section"><div className="goal-section-heading"><p className="detail-kicker">Explore the category</p><h2>Options within {goal.name.toLowerCase()}.</h2><p>Choose a topic to learn what it is, how it may fit into a wellness plan, and what the next step involves.</p></div><div className="goal-service-grid">{goal.services.map((service,index)=><Link href={goal.slug==="weight-loss"?`/treatments/${service.slug}`:`/services/${service.slug}`} className="goal-service-card" key={service.slug}><span>{String(index+1).padStart(2,"0")}</span><h3>{service.name}</h3><p>{service.note}</p><b>Learn more →</b></Link>)}</div></section><section className="goal-care-path"><div><p className="detail-kicker">A connected experience</p><h2>Education first. Personalized decisions next.</h2></div><ol><li><span>01</span><div><strong>Choose your goal</strong><p>Start with the outcome or concern that matters most to you.</p></div></li><li><span>02</span><div><strong>Complete the right assessment</strong><p>Share the health information needed for your pathway.</p></div></li><li><span>03</span><div><strong>Receive professional guidance</strong><p>When medical care is involved, an independent provider determines what is appropriate.</p></div></li></ol></section><SiteFooter/></main>;
}
