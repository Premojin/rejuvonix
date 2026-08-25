import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { allServices, findService } from "../../components/service-data";

export function generateStaticParams(){ return allServices.map(({slug})=>({slug})); }

export default async function ServicePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const service=findService(slug);
  if(!service) notFound();
  const clinical=/Wegovy|Zepbound|Mounjaro|Ozempic|Saxenda|Liraglutide|GLP-1|Sermorelin|Hormone|B12|Lipotropic|NAD\+/.test(service.name);
  return <main className="detail-page service-page"><SiteHeader/><section className="service-hero"><div><Link className="service-back" href={`/goals/${service.group.slug}`}>← {service.group.name}</Link><p className="detail-kicker">Rejuvonix service guide</p><h1>{service.name}</h1><p>{service.note}</p><Link className="detail-primary" href="/eligibility">{clinical?"Start health assessment":"Explore this option"}</Link></div><div className="service-orbit" aria-hidden="true"><i></i><span>{service.name}</span></div></section><section className="service-explainer"><article><span>01</span><h2>Start with context.</h2><p>Review the purpose of this option, who it may be relevant for, and the questions worth bringing to your care team.</p></article><article><span>02</span><h2>Make it personal.</h2><p>Your health history, goals, current medications and preferences matter more than a one-size-fits-all protocol.</p></article><article><span>03</span><h2>Choose the right next step.</h2><p>{clinical?"Prescription care is never guaranteed. An independent licensed provider determines eligibility, treatment and follow-up.":"Use this guide to decide whether the option belongs in your broader wellness routine."}</p></article></section><section className="service-safety"><div><p className="detail-kicker">Clear by design</p><h2>{clinical?"Clinical review comes before treatment.":"Support should fit the whole plan."}</h2></div><div><p>{clinical?"Availability, indications and suitability vary. Branded medicines are FDA approved for specific uses; compounded medications are not FDA approved and may be available only under applicable law and for an identified patient need.":"Supplements are not intended to diagnose, treat, cure or prevent disease. Discuss relevant conditions, medications and laboratory results with a qualified healthcare professional."}</p><Link href="/safety">Review safety information →</Link></div></section><SiteFooter/></main>;
}
