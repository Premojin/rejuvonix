"use client";

import Link from "next/link";
import {useRouter} from "next/navigation";
import {FormEvent,useEffect,useState} from "react";

const SESSION_KEY="rejuvonix-demo-session";

export type DemoSession={name:string;email:string;createdFrom:"sign-up"|"sign-in";journeyStage?:number};

export function readDemoSession():DemoSession|null{
  try{
    const value=sessionStorage.getItem(SESSION_KEY);
    return value?JSON.parse(value) as DemoSession:null;
  }catch{return null;}
}

export function clearDemoSession(){sessionStorage.removeItem(SESSION_KEY);}

export default function SimulatedAccountFlow({mode}:{mode:"sign-up"|"sign-in"}){
  const router=useRouter();
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[error,setError]=useState("");
  const isSignUp=mode==="sign-up";

  const submit=(event:FormEvent)=>{
    event.preventDefault();
    setError("");
    if(isSignUp&&!name.trim()){setError("Enter a fictional display name.");return;}
    if(!email.toLowerCase().endsWith("@example.com")){setError("For this simulation, use a fictional @example.com email address.");return;}
    if(password.length<8){setError("Use at least eight characters for the simulated password.");return;}
    const session:DemoSession={name:isSignUp?name.trim():email.split("@")[0],email:email.toLowerCase(),createdFrom:mode};
    sessionStorage.setItem(SESSION_KEY,JSON.stringify(session));
    router.push("/account");
  };

  return <form className="auth-form demo-auth-form" onSubmit={submit}>
    <div className="demo-badge"><strong>Simulation only</strong><span>No account is created and nothing is sent to Rejuvonix or EmberFlow.</span></div>
    <p className="detail-kicker">{isSignUp?"Create a demo account":"Demo account access"}</p>
    <h2>{isSignUp?"See the member journey.":"Continue your simulation."}</h2>
    <p className="demo-instruction">Use fictional information only. The temporary session stays in this browser tab and is not a patient account.</p>
    {isSignUp&&<label>Fictional display name<input required value={name} onChange={event=>setName(event.target.value)} autoComplete="off" placeholder="Alex Demo"/></label>}
    <label>Fictional email address<input required type="email" value={email} onChange={event=>setEmail(event.target.value)} autoComplete="off" placeholder="alex@example.com"/></label>
    <label>Simulated password<input required type="password" minLength={8} value={password} onChange={event=>setPassword(event.target.value)} autoComplete="off" placeholder="8 or more characters"/></label>
    {error&&<p className="demo-error" role="alert">{error}</p>}
    <button type="submit" className="detail-primary">{isSignUp?"Create demo account":"Enter demo account"}</button>
    <p>{isSignUp?<>Already started? <Link href="/sign-in">Sign in to the demo</Link></>:<>New to the journey? <Link href="/sign-up">Create a demo account</Link></>}</p>
    <small className="demo-footnote">Passwords are not transmitted or validated by an authentication provider. Do not use a real password.</small>
  </form>;
}

export function DemoAccountDashboard(){
  const router=useRouter();
  const[session,setSession]=useState<DemoSession|null>(null);
  const[ready,setReady]=useState(false);
  const[treatmentEvent,setTreatmentEvent]=useState<"Due"|"Taken"|"Delayed"|"Skipped">("Due");
  const[healthView,setHealthView]=useState<"Today"|"Treatment"|"Devices">("Today");
  useEffect(()=>{
    const timer=window.setTimeout(()=>{
      const current=readDemoSession();
      if(current&&new URLSearchParams(window.location.search).get("assessment")==="complete"){
        current.journeyStage=Math.max(current.journeyStage??0,1);
        sessionStorage.setItem(SESSION_KEY,JSON.stringify(current));
      }
      setSession(current);setReady(true);
    },0);
    return()=>window.clearTimeout(timer);
  },[]);
  if(!ready)return <div className="account-loading" role="status">Opening the simulated account…</div>;
  if(!session)return <section className="demo-empty"><p className="detail-kicker">No demo session</p><h1>Start with a simulated account.</h1><p>This area does not contain patient records or saved assessment answers.</p><div><Link className="detail-primary" href="/sign-up">Create demo account</Link><Link className="detail-secondary" href="/sign-in">Sign in</Link></div></section>;
  const stage=session.journeyStage??0;
  const stages=[
    {label:"Program selected",title:"Start the assessment",copy:"Choose a program and complete the fictional assessment questions.",action:"Start simulated assessment",href:"/eligibility/weight-loss"},
    {label:"Assessment complete",title:"Review and confirm",copy:"The preview is complete. In production, the patient would review answers and approved consent language before submission.",action:"Simulate submission"},
    {label:"Submitted",title:"Provider review pending",copy:"A fictional submission receipt is shown. No information has been transmitted and no clinical decision has been made.",action:"Simulate provider request"},
    {label:"More information needed",title:"Complete a follow-up request",copy:"Preview how a request for clarification, laboratory testing or an appointment would appear. No upload or scheduling is active.",action:"Simulate information supplied"},
    {label:"Review resumed",title:"Provider reviewing updates",copy:"The fictional case returns to the provider queue. The website does not determine eligibility or treatment.",action:"Simulate provider outcome"},
    {label:"Provider outcome",title:"Treatment-plan preview available",copy:"Preview the portal state after a licensed provider completes review. No medication, dose or prescription is generated by this simulation.",action:"Simulate pharmacy handoff"},
    {label:"Pharmacy handoff",title:"Fulfillment preview",copy:"Preview prescription-routing and pharmacy-status areas without naming a drug, creating an order or contacting a pharmacy.",action:"Simulate follow-up stage"},
    {label:"Follow-up",title:"Ongoing-care preview",copy:"Preview future messages, required labs, follow-up visits and refill-review status. All actions remain disabled.",action:"Simulate reassessment"},
    {label:"Reassessment & renewal",title:"Decide what happens next",copy:"Preview a provider-controlled decision to continue, adjust, pause, discontinue, refer or move into maintenance. No refill or treatment change is created.",action:"Simulate next follow-up cycle"},
  ];
  const current=stages[stage];
  const advance=()=>{
    const next=stage===stages.length-1?7:stage+1;
    const updated={...session,journeyStage:next};
    sessionStorage.setItem(SESSION_KEY,JSON.stringify(updated));
    setSession(updated);
  };
  const reset=()=>{const updated={...session,journeyStage:0};sessionStorage.setItem(SESSION_KEY,JSON.stringify(updated));setSession(updated);};
  const signOut=()=>{clearDemoSession();router.push("/sign-in");};
  return <section className="demo-dashboard">
    <div className="demo-dashboard-head"><div><p className="detail-kicker">Simulated member portal</p><h1>Welcome, {session.name}.</h1><p>Explore the member journey while production identity, records and EmberFlow remain disconnected.</p></div><button type="button" className="demo-signout" onClick={signOut}>End demo session</button></div>
    <div className="demo-status" role="status"><span>Demo mode</span><strong>This is a fictional workflow. No clinical information is stored, transmitted or reviewed by a provider.</strong></div>
    <section className="account-jin" aria-labelledby="account-jin-title">
      <header className="account-jin-head"><div><p className="detail-kicker">Jin Connected Health</p><h2 id="account-jin-title">Your care and progress, in one useful view.</h2></div><Link href="/connected-health">How Jin works <span>→</span></Link></header>
      <nav className="account-jin-tabs" aria-label="Connected health demo views">{(["Today","Treatment","Devices"] as const).map(view=><button type="button" key={view} className={healthView===view?"active":""} aria-pressed={healthView===view} onClick={()=>setHealthView(view)}>{view}</button>)}</nav>
      {healthView==="Today"&&<div className="account-jin-grid">
        <article className="account-next-action"><span>JIN · TODAY</span><h3>Build an easy movement win.</h3><p>Your recent activity is below the fictional seven day baseline. Sleep and hydration signals are current.</p><div><b>Suggested wellness action</b><strong>20 minute walk</strong></div><small>This does not change the care plan.</small></article>
        <article className="account-pillars"><div><span>Measure</span><b>3 signals current</b></div><div><span>Move</span><b>Below baseline</b></div><div><span>Fuel</span><b>Check in due</b></div><div><span>Optimize</span><b>6 nights available</b></div></article>
        <article className="account-trust"><span>INSIGHT QUALITY</span><strong>High confidence</strong><div><i/></div><p>Freshness, coverage and source quality are shown before Jin explains a pattern.</p></article>
      </div>}
      {healthView==="Treatment"&&<div className="account-treatment-demo">
        <article><div><span>Provider assigned treatment</span><strong>Due today · 7:00 PM</strong></div><b className={`event-${treatmentEvent.toLowerCase()}`}>{treatmentEvent}</b></article>
        <dl><div><dt>Schedule</dt><dd>Synced from care plan</dd></div><div><dt>Dose</dt><dd>Locked to provider order</dd></div><div><dt>Last site</dt><dd>Left abdomen</dd></div><div><dt>Check in</dt><dd>No change reported</dd></div></dl>
        <div className="account-event-actions"><span>Demo dose event</span><div>{(["Taken","Delayed","Skipped"] as const).map(event=><button type="button" key={event} className={treatmentEvent===event?"active":""} onClick={()=>setTreatmentEvent(event)}>{event}</button>)}</div></div>
        <p>Only the licensed provider can change the treatment plan. This interaction stays in the browser and is not saved.</p>
      </div>}
      {healthView==="Devices"&&<div className="account-device-demo">
        {[["Health platform","Connected","Updated 8 min ago"],["Smart scale","Connected","Updated this morning"],["Sleep wearable","Permission needed","No recent data"],["Blood pressure","Not connected","Manual entry available"]].map(([name,status,detail])=><article key={name}><span/><div><strong>{name}</strong><small>{detail}</small></div><b>{status}</b></article>)}
      </div>}
    </section>
    <div className="account-care-label"><span>Care journey</span><p>The provider, pharmacy and follow up workflow remains separate from Jin wellness guidance.</p></div>
    <div className="journey-layout"><nav className="journey-timeline" aria-label="Simulated care journey">{stages.map((item,index)=><div className={index===stage?"active":index<stage?"complete":""} key={item.label}><span>{index<stage?"✓":String(index+1).padStart(2,"0")}</span><div><strong>{item.label}</strong><small>{index===stage?"Current simulation stage":index<stage?"Simulated complete":"Not yet simulated"}</small></div></div>)}</nav><article className="journey-current"><p className="detail-kicker">Stage {stage+1} of {stages.length} · {current.label}</p><h2>{current.title}</h2><p>{current.copy}</p><div className="journey-safeguard"><strong>Simulation safeguard</strong><span>Real identity, consent, uploads, submission, provider review, prescribing, pharmacy routing and payment remain disabled.</span></div>{current.href?<Link className="journey-action" href={current.href}>{current.action} →</Link>:<button type="button" className="journey-action" onClick={advance}>{current.action} →</button>}<button type="button" className="journey-reset" onClick={reset}>Reset demo progress</button></article></div>
  </section>;
}
