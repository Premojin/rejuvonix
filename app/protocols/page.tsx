import Link from "next/link";
import {SiteFooter,SiteHeader} from "../components/SiteChrome";
import {protocolGoals,protocols} from "../components/protocol-data";

export default function ProtocolsPage(){
  return <main className="detail-page protocols-page">
    <SiteHeader/>
    <section className="protocol-hero">
      <div><p className="detail-kicker">Protocol library</p><h1>Explore the complete protocol catalog.</h1><p>Start with a goal or browse the full educational library. A protocol appearing here does not mean it is available or appropriate for you. Independent licensed providers make clinical decisions after review.</p></div>
      <div className="protocol-hero-index" aria-label="Protocol library summary"><span>MASTER LIBRARY</span><strong>{String(protocols.length).padStart(2,"0")}</strong><small>protocol entries mapped across five Rejuvonix goals</small></div>
    </section>
    <nav className="protocol-filter-bar" aria-label="Protocol categories">
      <Link className="active" href="/protocols">All Protocols</Link>
      {protocolGoals.map((goal)=><Link href={`/protocols/${goal.slug}`} key={goal.slug}>{goal.name}</Link>)}
    </nav>
    <section className="protocol-library" id="all-protocols">
      <div className="protocol-library-heading"><div><p className="detail-kicker">All protocols</p><h2>One library. Clear pathways.</h2></div><p>The catalog is organized using the Rejuvonix goals while retaining the source-category context needed for clinical and compliance review.</p></div>
      <div className="protocol-grid">
        {protocols.map((protocol,index)=><Link className="protocol-card" href={`/protocols/${protocol.slug}`} key={protocol.slug}>
          <span className="protocol-card-number">{String(index+1).padStart(2,"0")}</span>
          <span className="protocol-card-category">{protocol.sourceCategory}</span>
          <h3>{protocol.name}</h3><p>{protocol.summary}</p>
          <span className="protocol-goal-tags">{protocol.goals.map((goal)=><i key={goal}>{protocolGoals.find((item)=>item.slug===goal)?.name}</i>)}</span>
          <span className={`protocol-doc-status status-${protocol.documentation.status}`}>{protocol.documentation.status==="official-documentation"?protocol.documentation.label:protocol.documentation.batches.length?"COA available":protocol.documentation.label}</span>
          <b>View protocol →</b>
        </Link>)}
      </div>
    </section>
    <section className="protocol-clinical-note"><div><p className="detail-kicker">Clinical boundary</p><h2>Education first. Provider judgment always.</h2></div><p>Some catalog entries are investigational, compounded, not FDA approved for the goal shown, or may not be legally or clinically available. Rejuvonix will not convert a catalog entry into a treatment offer until the relevant provider, pharmacy, state and regulatory requirements are verified.</p></section>
    <SiteFooter/>
  </main>
}
