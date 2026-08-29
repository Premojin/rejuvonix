import Link from "next/link";
import {ProtocolItem,protocolGoals} from "./protocol-data";

function docLabel(protocol: ProtocolItem){
  if(protocol.documentation.status==="official-documentation") return protocol.documentation.label;
  if(protocol.documentation.batches.length) return "COA available";
  return protocol.documentation.label;
}

export function ProtocolCard({protocol,index}:{protocol:ProtocolItem;index:number}){
  const hasCompoundedPharmacy = protocol.compoundedContext === "possible" || protocol.documentation.batches.length > 0;
  return <Link className="protocol-card protocol-product-card" href={`/protocols/${protocol.slug}`}>
    <div className="protocol-card-visual" aria-hidden="true">
      <span className="protocol-card-number">{String(index+1).padStart(2,"0")}</span>
      <img src={protocol.image} alt=""/>
    </div>
    <div className="protocol-card-body">
      <span className="protocol-card-category">{protocol.sourceCategory}</span>
      <h3>{protocol.name}</h3>
      <strong className="protocol-price">{protocol.priceLabel}</strong>
      <p>{protocol.summary}</p>
      <span className="protocol-goal-tags">{protocol.goals.map((goal)=><i key={goal}>{protocolGoals.find((item)=>item.slug===goal)?.name}</i>)}</span>
      <div className="protocol-card-checks">
        <span><i>✓</i>Reviewed by a licensed provider</span>
        {hasCompoundedPharmacy && <span><i>✓</i>Compounded in a U.S. pharmacy</span>}
      </div>
      <span className={`protocol-doc-status status-${protocol.documentation.status}`}>{docLabel(protocol)}</span>
      <b className="protocol-card-cta">View {protocol.name} <span>→</span></b>
    </div>
  </Link>
}

export function ProtocolTrustStrip(){
  return <div className="protocol-inline-trust" aria-label="Protocol experience standards">
    <span><b>✓</b>Provider reviewed</span>
    <span><b>✓</b>U.S. pharmacy fulfillment</span>
    <span><b>⌁</b>Encrypted experience</span>
  </div>
}
