import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

export const metadata: Metadata = {title:"Why Membership | Rejuvonix",description:"See how Rejuvonix membership keeps guidance, follow-up and next steps connected around your care journey."};

const betweenVisitCare=[
  ["Care that responds","Your goals, questions and progress remain part of the conversation as your care continues."],
  ["Scheduled reassessment","Provider-directed follow-up and periodic reviews make changes visible and clinically accountable."],
  ["Support between visits","Education, secure communication when activated, reminders and visible next steps help you understand what happens after a provider decision."],
  ["Progress in context","Approved laboratory results, connected-health signals and your care history can support a more informed follow-up conversation."],
];
const journey=[
  ["01","We learn what matters","Begin with your goals, health history and preferences through the appropriate assessment."],
  ["02","A provider reviews your information","An independent licensed provider makes every clinical decision and determines the appropriate next step."],
  ["03","Your care stays visible","Follow provider requests, fulfillment updates if prescribed, and required check-ins in one organized experience."],
  ["04","The plan can evolve","Your provider reassesses progress and decides whether care continues, changes, pauses or ends."],
];
const comparison=[
  ["Who supports you","A connected care experience built around your history","A single prescription interaction","Separate appointments and records"],
  ["Between visits","Guidance, status and next actions remain visible","Support may be limited","Wait for another appointment"],
  ["Beyond medication","Education, follow-up and care coordination","Often medication focused","May require separate referrals"],
  ["When needs change","A provider reviews the new information","A new interaction may be required","A new visit may be required"],
];

export default function MembershipPage(){return <main className="membership-page membership-page-v3"><SiteHeader/>
  <section className="membership-hero membership-hero-v3"><img src="/membership-latino-couple-hero.png" alt="A happy Latino couple walking with their children on a bright morning"/><div className="membership-veil"/><div className="membership-hero-copy"><p className="eyebrow">The Rejuvonix membership experience</p><h1>A prescription can start a plan. Membership keeps care connected.</h1><p>Your guidance, progress and next steps, organized around the life you are living.</p><Link className="membership-button" href="/eligibility">Explore your options <span>→</span></Link><small>Treatment and membership are not guaranteed. Independent providers make all clinical decisions.</small></div></section>

  <section className="membership-intro"><p className="eyebrow">The space between appointments</p><h2>Care should keep moving when life does.</h2><p>Questions do not always arrive during a visit. Rejuvonix is designed to keep your information, provider-directed next steps and follow-up experience connected over time.</p><div className="membership-pillars">{betweenVisitCare.map(([title,copy],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

  <section className="membership-film"><img src="/membership-provider-v2.webp" alt="A clinician connecting with a patient through telehealth"/><div><p className="eyebrow">Care from real people</p><h2>Technology opens the door. People guide the experience.</h2><p>Rejuvonix organizes access and communication. Independent licensed providers evaluate clinical information, make treatment decisions and determine follow-up.</p><Link href="/how-it-works">See how care works <span>→</span></Link></div></section>

  <section className="membership-difference"><div className="membership-section-heading"><p className="eyebrow">The Rejuvonix difference</p><h2>More continuity. Less starting over.</h2><p>Membership is designed to make the full care experience easier to understand and follow.</p></div><div className="membership-table" role="table" aria-label="Comparison of care experiences"><div className="membership-table-head" role="row"><span role="columnheader">Experience</span><strong role="columnheader">Rejuvonix membership</strong><span role="columnheader">Prescription only</span><span role="columnheader">Traditional visits</span></div>{comparison.map((row)=><div className="membership-table-row" role="row" key={row[0]}>{row.map((cell,index)=>index===0?<strong role="rowheader" key={cell}>{cell}</strong>:<span role="cell" key={cell}>{cell}</span>)}</div>)}</div></section>

  <section className="membership-journey"><div className="membership-section-heading"><p className="eyebrow">A journey built around you</p><h2>One relationship. Clear next steps.</h2><p>The experience stays organized while clinical decisions remain with independent licensed providers.</p></div><div className="membership-stage-grid">{journey.map(([number,title,copy])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

  <section className="membership-practice"><div><p className="eyebrow">How membership works here</p><h2>Continuity is part of the plan.</h2></div><div className="membership-practice-grid"><article><span>01</span><h3>Context that carries forward</h3><p>Your goals, responses and completed steps remain part of an organized member experience.</p></article><article><span>02</span><h3>Scheduled provider review</h3><p>Required assessments and follow-up timing remain visible. Independent providers determine all clinical decisions.</p></article><article><span>03</span><h3>Progress tracking</h3><p>Approved laboratory data, symptoms, measurements and connected-health signals can be viewed in context when integrations are active.</p></article><article><span>04</span><h3>Support beyond a prescription</h3><p>See education, provider requests, fulfillment progress if prescribed, and follow-up milestones.</p></article><article><span>05</span><h3>Care that can adjust</h3><p>When new information matters, an independent provider determines whether the plan should continue, change, pause or end.</p></article></div></section>

  <section className="membership-mosaic"><article className="membership-mosaic-lead"><img src="/membership-phone-v2.webp" alt="A member viewing care information on a phone"/><div><p className="eyebrow">One connected view</p><h2>Know where you are and what comes next.</h2></div></article><article><img src="/membership-followup-v2.webp" alt="A member reviewing follow-up information"/><strong>Follow the next step.</strong></article><article><img src="/membership-movement-v2.webp" alt="A woman moving confidently outdoors"/><strong>Keep building momentum.</strong></article></section>

  <section className="membership-access"><div><p className="eyebrow">Straightforward by design</p><h2>Membership details without the guesswork.</h2></div><div><p>Final membership inclusions and pricing are under review. Until the clinical platform and approved terms are active, this page does not accept enrollment, payment, health information or clinical submissions.</p><Link className="membership-button dark" href="/eligibility">Preview the experience <span>→</span></Link></div></section>

  <section className="membership-closing"><img src="/membership-closing-v2.webp" alt="A diverse group of adults enjoying an active day together"/><div><p className="eyebrow">Start where you are</p><h2>Care built for today and what comes next.</h2><p>Explore Rejuvonix programs and see how a connected membership experience can support your journey.</p><Link className="membership-button" href="/eligibility">Begin the experience <span>→</span></Link></div></section>
  <SiteFooter/>
</main>}
