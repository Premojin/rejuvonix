import Link from "next/link";
import {notFound} from "next/navigation";
import {SiteFooter,SiteHeader} from "../../components/SiteChrome";
import {findProtocol,findProtocolGoal,protocolGoals,protocols,protocolsForGoal} from "../../components/protocol-data";

export function generateStaticParams(){return [...protocolGoals.map(({slug})=>({slug})),...protocols.map(({slug})=>({slug}))];}

function documentationLabel(status:string,label:string){
  if(status==="coa-verified") return "COA available";
  if(status==="official-documentation") return "Official documentation";
  return label;
}

function coaStatusLabel(status:string){
  if(status==="verified") return "Imported BioPivot COA";
  if(status==="not-required") return "COA not required";
  return "BioPivot COA import pending";
}

function qualitySummary(approvalStatus:string,coaStatus:string){
  if(approvalStatus==="fda-approved") return "Official FDA/manufacturer documentation · COA not required";
  if(coaStatus==="verified") return "Exact-match BioPivot COA imported";
  return "Exact-match BioPivot COA not yet verified";
}

export default async function ProtocolRoute({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const goal=findProtocolGoal(slug);
  if(goal){
    const items=protocolsForGoal(goal.slug);
    return <main className="detail-page protocols-page"><SiteHeader/>
      <section className="protocol-category-hero"><div><p className="detail-kicker">Protocols · {goal.name}</p><h1>{goal.name} protocols.</h1><p>{goal.intro}</p><Link className="detail-primary" href={goal.assessmentRoute}>Start {goal.name.toLowerCase()} assessment</Link></div><div className="protocol-category-count"><strong>{String(items.length).padStart(2,"0")}</strong><span>catalog entries</span></div></section>
      <nav className="protocol-filter-bar" aria-label="Protocol categories"><Link href="/protocols">All Protocols</Link>{protocolGoals.map((item)=><Link className={item.slug===goal.slug?"active":""} href={`/protocols/${item.slug}`} key={item.slug}>{item.name}</Link>)}</nav>
      <section className="protocol-library"><div className="protocol-library-heading"><div><p className="detail-kicker">Explore {goal.name}</p><h2>Review the available education before sharing health information.</h2></div><p>Category placement is for discovery. It does not establish an approved indication, guarantee availability, or replace an independent provider&apos;s clinical judgment.</p></div><div className="protocol-grid">{items.map((protocol,index)=><Link className="protocol-card" href={`/protocols/${protocol.slug}`} key={protocol.slug}><span className="protocol-card-number">{String(index+1).padStart(2,"0")}</span><span className="protocol-card-category">{protocol.sourceCategory}</span><h3>{protocol.name}</h3><p>{protocol.summary}</p><div className="protocol-card-meta"><span>{protocol.approval.label}</span></div><span className={`protocol-doc-status status-${protocol.documentation.status}`}>{documentationLabel(protocol.documentation.status,protocol.documentation.label)}</span><b>Open protocol →</b></Link>)}</div></section>
      <SiteFooter/></main>;
  }

  const protocol=findProtocol(slug);
  if(!protocol) notFound();
  const primaryGoal=protocolGoals.find((goalItem)=>goalItem.slug===protocol.goals[0]);
  const approved=protocol.approval.status==="fda-approved";
  const hasOfficialDocument=protocol.documentation.status==="official-documentation"&&Boolean(protocol.documentation.url);
  const coaHref=protocol.bioPivotCoa.importedUrl??protocol.bioPivotCoa.url;
  const hasVerifiedCoa=protocol.bioPivotCoa.status==="verified"&&Boolean(coaHref);

  return <main className="detail-page protocol-detail-page"><SiteHeader/>
    <section className="protocol-detail-hero"><div><p className="detail-kicker">Protocol education · {protocol.sourceCategory}</p><h1>{protocol.name}</h1><p>{protocol.summary}</p><div className="protocol-detail-actions">{primaryGoal&&<Link className="detail-primary" href={primaryGoal.assessmentRoute}>Start {primaryGoal.name.toLowerCase()} assessment</Link>}<a href="#quality">Quality & documentation ↓</a></div></div><aside><span>REGULATORY STATUS</span><strong className={`protocol-approval-label approval-${protocol.approval.status}`}>{protocol.approval.label}</strong>{protocol.approval.approvedUse&&<p>{protocol.approval.approvedUse}</p>}<span className="protocol-related-title">RELATED GOALS</span>{protocol.goals.map((goalSlug)=><Link href={`/protocols/${goalSlug}`} key={goalSlug}>{protocolGoals.find((item)=>item.slug===goalSlug)?.name} →</Link>)}</aside></section>

    <section className="protocol-clinical-brief"><div className="protocol-section-heading"><p className="detail-kicker">Clinical brief</p><h2>Understand the protocol before the pathway.</h2><p>Specific information is presented without dosing instructions and without implying that catalog inclusion makes a treatment appropriate or available.</p></div><div className="protocol-brief-grid"><article><span>01</span><p className="detail-kicker">What it is</p><h3>Clinical identity</h3><p>{protocol.clinical.overview}</p></article><article><span>02</span><p className="detail-kicker">How it works</p><h3>Mechanism</h3><p>{protocol.clinical.mechanism}</p></article><article><span>03</span><p className="detail-kicker">Evidence</p><h3>What the evidence means</h3><p>{protocol.clinical.evidenceContext}</p></article></div></section>

    <section className="protocol-review-grid"><article><p className="detail-kicker">Provider discussion</p><h2>What a provider may need to review.</h2><ul>{protocol.discussionPoints.map((point)=><li key={point}>{point}</li>)}</ul></article><article><p className="detail-kicker">Safety & eligibility</p><h2>What should stay visible.</h2><ul>{protocol.clinical.safetyPoints.map((point)=><li key={point}>{point}</li>)}</ul></article></section>

    <section className="protocol-regulatory"><div><p className="detail-kicker">Regulatory context</p><h2>{protocol.approval.label}</h2></div><div><p>{protocol.regulatoryNote}</p>{approved&&<p className="protocol-regulatory-callout"><strong>FDA-approved item rule:</strong> the FDA-approved finished drug product uses official prescribing information and does not require a COA. This does not make a separately compounded formulation FDA approved.</p>}</div></section>

    <section className="protocol-pipeline"><div><p className="detail-kicker">Connected pathway</p><h2>From discovery to documented next steps.</h2><p>Rejuvonix keeps the protocol pathway connected without bypassing provider review.</p></div><ol><li><span>01</span><strong>Learn</strong><p>Review protocol-specific evidence, safety and regulatory context.</p></li><li><span>02</span><strong>Assess</strong><p>Complete the appropriate Rejuvonix assessment when you are ready.</p></li><li><span>03</span><strong>Provider review</strong><p>An independent licensed provider determines whether any treatment is appropriate.</p></li><li><span>04</span><strong>Source & document</strong><p>If treatment is prescribed, the exact product/source and applicable documentation stay connected to the pathway.</p></li></ol></section>

    <section className="protocol-quality" id="quality"><div><p className="detail-kicker">Quality & documentation</p><h2>Documentation follows the exact item.</h2><p>FDA-approved finished drug products use official FDA/manufacturer documentation and do not require a COA. For non-FDA items, an existing BioPivot certificate may be imported only after the exact item-to-document relationship is verified. Imported certificates retain their BioPivot source trail; no substitute-vendor certificate is used.</p><div className="protocol-source-list"><h3>Supporting sources</h3>{protocol.references.map((reference)=><a href={reference.url} target="_blank" rel="noreferrer" key={`${reference.kind}-${reference.url}`}><span>{reference.kind.replaceAll("-"," ")}</span><strong>{reference.label}</strong><b>↗</b></a>)}</div></div><div className="protocol-document-card"><span className={`protocol-doc-status status-${protocol.documentation.status}`}>{documentationLabel(protocol.documentation.status,protocol.documentation.label)}</span><h3>{protocol.name}</h3><p className="protocol-document-type"><b>{coaStatusLabel(protocol.bioPivotCoa.status)}</b></p><p className="protocol-quality-summary">{qualitySummary(protocol.approval.status,protocol.bioPivotCoa.status)}</p><p>{protocol.bioPivotCoa.note}</p>{protocol.bioPivotCoa.lot&&<p><b>COA lot/batch:</b> {protocol.bioPivotCoa.lot}</p>}{protocol.bioPivotCoa.testedAt&&<p><b>COA test date:</b> {protocol.bioPivotCoa.testedAt}</p>}{protocol.bioPivotCoa.laboratory&&<p><b>Testing laboratory:</b> {protocol.bioPivotCoa.laboratory}</p>}{protocol.bioPivotCoa.testMethods?.length&&<p><b>Methods:</b> {protocol.bioPivotCoa.testMethods.join(", ")}</p>}{protocol.bioPivotCoa.verifiedAt&&<p><b>Source match verified:</b> {protocol.bioPivotCoa.verifiedAt}</p>}{protocol.documentation.source&&<p><b>Document source:</b> {protocol.documentation.source}</p>}{hasOfficialDocument&&<a className="detail-primary" href={protocol.documentation.url} target="_blank" rel="noreferrer">View official documentation ↗</a>}{hasVerifiedCoa&&<a className="detail-primary" href={coaHref} target="_blank" rel="noreferrer">View imported COA ↗</a>}{hasVerifiedCoa&&protocol.bioPivotCoa.sourceUrl&&<a className="protocol-source-origin" href={protocol.bioPivotCoa.sourceUrl} target="_blank" rel="noreferrer">Open original BioPivot source ↗</a>}{!hasOfficialDocument&&!hasVerifiedCoa&&<p className="protocol-document-note">No certificate is displayed until the exact BioPivot item and certificate are matched. Import permission is enabled; verification is the remaining gate.</p>}{approved&&protocol.compoundedContext==="possible"&&<p className="protocol-document-note">If a separately compounded formulation is ever used, it is a different product pathway and would require its own source and quality documentation.</p>}</div></section>

    <section className="protocol-closing"><p className="detail-kicker">Next step</p><h2>Clinical decisions stay with licensed providers.</h2><p>Completing an assessment does not guarantee treatment or a prescription.</p>{primaryGoal&&<Link className="detail-primary" href={primaryGoal.assessmentRoute}>Continue to {primaryGoal.name.toLowerCase()} assessment</Link>}</section>
    <SiteFooter/>
  </main>;
}
