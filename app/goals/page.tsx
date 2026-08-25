import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { approvedGoals, findGoal } from "../components/service-data";

export default function GoalsPage(){
  return <main className="detail-page goal-page"><SiteHeader/><section className="legal-hero"><p className="detail-kicker">Your goals</p><h1>Choose the direction that fits your life.</h1><p>Explore the three Rejuvonix pathways currently available for discovery.</p></section><section className="goal-service-section"><div className="goal-section-heading"><p className="detail-kicker">Start here</p><h2>Care organized around what matters to you.</h2></div><div className="goal-service-grid">{approvedGoals.map((goal,index)=>{ const group=findGoal(goal.slug); return <Link href={goal.href} className="goal-service-card" key={goal.slug}><span>{String(index+1).padStart(2,"0")}</span><h3>{goal.name}</h3><p>{group?.intro ?? "A connected Rejuvonix pathway for education, access and ongoing support."}</p><b>Explore this goal →</b></Link>; })}</div></section><SiteFooter/></main>;
}
