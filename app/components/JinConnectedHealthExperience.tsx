"use client";

import Link from "next/link";
import { useState } from "react";

type LogState = "Due" | "Taken" | "Skipped" | "Delayed";

const pillars = [
  {name:"Measure",number:"01",headline:"Know what changed, and how reliable it is.",copy:"Weight, body composition, blood pressure and selected vitals appear with source, freshness and measurement quality.",metrics:["Weight trend","Body composition","Blood pressure","Health snapshot"],accent:"#35b6b8"},
  {name:"Move",number:"02",headline:"Turn activity into an achievable next step.",copy:"Steps, workouts, mobility and strength check ins support provider guided care without turning the experience into a raw data dashboard.",metrics:["Steps and distance","Workout sessions","Mobility check ins","Strength progress"],accent:"#bdc3c3"},
  {name:"Fuel",number:"03",headline:"Connect nutrition to the care journey.",copy:"Protein, fiber, hydration, appetite and digestive check ins add context around progress and treatment tolerance.",metrics:["Protein pattern","Fiber and produce","Hydration","Appetite and GI"],accent:"#434b4e"},
  {name:"Optimize",number:"04",headline:"See recovery and adherence together.",copy:"Sleep, recovery, symptoms and the treatment timeline help Jin explain patterns while the licensed provider remains in control of clinical care.",metrics:["Sleep regularity","Recovery context","Treatment adherence","Symptoms and notes"],accent:"#35b6b8"},
];

const devices = [
  {name:"Apple Health",status:"Planned",copy:"HealthKit data with source, freshness and permission controls.",visual:<img src="https://developer.apple.com/assets/elements/icons/healthkit/healthkit-128x128_2x.png" alt="Apple Health"/>},
  {name:"Android Health",status:"Ready path",copy:"Health Connect first, with Google and Samsung depth where approved.",visual:<img src="https://developer.android.com/static/downloads/assets/health_connect_logo.png" alt="Health Connect"/>},
  {name:"Smart scales",status:"Priority",copy:"Weight and body composition from supported Withings and other verified sources.",visual:<span className="device-glyph" aria-hidden="true">⚖</span>},
  {name:"Wearables",status:"Expandable",copy:"Apple Watch Ultra and leading Android watches can contribute supported health and activity signals.",visual:<span className="watch-pair" aria-label="Apple and Android health watches"><b>♥<small>76</small></b><b>●<small>8.4k</small></b></span>},
];

export function JinConnectedHealthExperience(){
  const [activePillar,setActivePillar]=useState(0);
  const [logState,setLogState]=useState<LogState>("Due");
  const pillar=pillars[activePillar];

  return <>
    <section className="jin-hero">
      <div className="jin-hero-copy">
        <p className="jin-kicker"><span/>Jin Connected Health</p>
        <h1>One connected view of your care, habits and progress.</h1>
        <p className="jin-lead">Jin brings provider assigned treatment steps, health devices, daily check ins and the Four Pillars into one clear member experience.</p>
        <div className="jin-hero-actions"><Link className="jin-primary" href="#today">Explore the member view <span>→</span></Link><Link className="jin-secondary" href="#system">See how data connects</Link></div>
        <p className="jin-safe-copy">Jin supports the care plan. It does not prescribe, change a dose or replace a licensed healthcare professional.</p>
      </div>
      <div className="jin-hero-visual" aria-label="Illustration of the Jin Connected Health member experience">
        <div className="jin-orbit orbit-one"/><div className="jin-orbit orbit-two"/>
        <div className="jin-console">
          <div className="jin-console-top"><span><b>J</b> JIN</span><small>CONNECTED</small></div>
          <div className="jin-console-greeting"><p>Good morning</p><h2>Your next best step is clear.</h2></div>
          <div className="jin-console-grid">
            <article className="jin-score"><div className="jin-score-ring"><strong>82</strong><small>Health view</small></div><p><b>7 of 8</b> signals current</p></article>
            <article className="jin-action"><span>Today</span><h3>Take a 20 minute walk</h3><p>Activity is below your recent baseline. Your treatment plan stays unchanged.</p><button type="button">View why</button></article>
          </div>
          <div className="jin-console-pills"><span>Measure <b>Current</b></span><span>Move <b>One action</b></span><span>Fuel <b>Check in</b></span><span>Optimize <b>Review</b></span></div>
        </div>
        <div className="jin-floating-card floating-device"><span>DEVICE SYNC</span><strong>Updated 8 min ago</strong></div>
        <div className="jin-floating-card floating-care"><span>CARE PLAN</span><strong>Provider assigned</strong></div>
      </div>
    </section>

    <section className="jin-trust" aria-label="Connected health principles">
      <article><span>01</span><div><strong>Provider controlled plan</strong><p>Clinical instructions stay locked to the authorized care record.</p></div></article>
      <article><span>02</span><div><strong>Apple and Android ready</strong><p>Both platforms feed the same Rejuvonix health model.</p></div></article>
      <article><span>03</span><div><strong>Source aware data</strong><p>Every signal carries origin, time and quality context.</p></div></article>
      <article><span>04</span><div><strong>Privacy by design</strong><p>Members control connections, permissions and deletion.</p></div></article>
    </section>

    <section className="jin-pillars" id="pillars">
      <div className="jin-section-heading"><div><p className="jin-kicker"><span/>The Four Pillars</p><h2>More data is not the goal. Better timed action is.</h2></div><p>Each pillar combines measurable signals, the member&apos;s own context and one useful action. Jin explains what contributed and how confident the system is.</p></div>
      <div className="jin-pillar-shell">
        <div className="jin-pillar-tabs" role="tablist" aria-label="Four Pillars">
          {pillars.map((item,index)=><button type="button" role="tab" aria-selected={activePillar===index} className={activePillar===index?"active":""} onClick={()=>setActivePillar(index)} key={item.name}><span>{item.number}</span><strong>{item.name}</strong></button>)}
        </div>
        <article className="jin-pillar-panel" style={{"--pillar-accent":pillar.accent} as React.CSSProperties}>
          <div><p>{pillar.number} · {pillar.name}</p><h3>{pillar.headline}</h3><span>{pillar.copy}</span></div>
          <ul>{pillar.metrics.map(metric=><li key={metric}><i/> {metric}</li>)}</ul>
        </article>
      </div>
    </section>

    <section className="jin-today" id="today">
      <div className="jin-today-intro"><p className="jin-kicker"><span/>Treatment timeline</p><h2>Track what was prescribed, what happened and how you felt.</h2><p>The Rejuvonix timeline is built for guided care. The provider assigned schedule remains separate from the member&apos;s dose event, symptoms, injection site and notes.</p><div className="jin-guardrail"><strong>Clinical guardrail</strong><span>Jin can organize and summarize. Only the licensed provider can change the treatment plan.</span></div></div>
      <div className="jin-tracker" aria-live="polite">
        <div className="jin-tracker-head"><div><span>Today · 7:00 PM</span><strong>Provider assigned treatment</strong></div><b className={`log-${logState.toLowerCase()}`}>{logState}</b></div>
        <dl><div><dt>Schedule</dt><dd>Synced from care plan</dd></div><div><dt>Dose</dt><dd>Locked to provider order</dd></div><div><dt>Method</dt><dd>Per care instructions</dd></div><div><dt>Last site</dt><dd>Left abdomen</dd></div></dl>
        <div className="jin-site-row"><span>Site rotation</span><div><i/><i className="used"/><i/><i/></div><small>3 sites available</small></div>
        <div className="jin-log-actions"><span>Demo dose event</span><div>{(["Taken","Delayed","Skipped"] as LogState[]).map(state=><button type="button" className={logState===state?"active":""} onClick={()=>setLogState(state)} key={state}>{state}</button>)}</div></div>
        <label className="jin-checkin">How do you feel today?<select aria-label="Demo symptom check in"><option>No change to report</option><option>I have a symptom to record</option><option>I want provider support</option></select></label>
        <p className="jin-demo-note">Interactive demonstration only. Nothing is saved or sent.</p>
      </div>
    </section>

    <section className="jin-devices" id="devices">
      <div className="jin-section-heading"><div><p className="jin-kicker"><span/>Connected data</p><h2>One health platform. Multiple trusted paths.</h2></div><p>Rejuvonix preserves the original source and freshness of each signal. Direct vendor connections are added only when they improve reliability, timing or useful detail.</p></div>
      <div className="jin-device-grid">{devices.map((device,index)=><article key={device.name}><span>0{index+1}</span><small>{device.status}</small><div className="jin-device-visual">{device.visual}</div><h3>{device.name}</h3><p>{device.copy}</p><i/></article>)}</div>
      <p className="jin-device-note">Availability varies by device, operating system, app version, permissions and region. Connected data supports general wellness and provider communication. Source device safety alerts remain authoritative.</p>
    </section>

    <section className="jin-intelligence">
      <div className="jin-intelligence-card"><div className="jin-avatar">J</div><p className="jin-kicker"><span/>Jin explains the pattern</p><h2>“Your activity was lower on three of the last four days. Sleep and hydration data are current. Your treatment schedule has not changed.”</h2><p>Jin shows the contributing sources, timing and confidence. It uses association language and sends clinical questions back to the care team.</p><button type="button">Why am I seeing this? <span>+</span></button></div>
      <div className="jin-confidence"><p>Insight quality</p><strong>High confidence</strong><div><span style={{width:"86%"}}/></div><ul><li><b>Freshness</b><span>Current</span></li><li><b>Coverage</b><span>6 of 7 days</span></li><li><b>Sources</b><span>3 connected</span></li><li><b>Clinical scope</b><span>Wellness only</span></li></ul></div>
    </section>

    <section className="jin-system" id="system">
      <div className="jin-section-heading light"><div><p className="jin-kicker"><span/>Complete management ecosystem</p><h2>A durable platform behind every member experience.</h2></div><p>Jin should operate through permissioned services and reviewed rules, not as one unrestricted AI. Every action is traceable to the data, policy and person that authorized it.</p></div>
      <div className="jin-system-map">
        <article><span>04</span><small>Experiences</small><h3>Member · Provider · Care team · Operations</h3></article>
        <article><span>03</span><small>Jin intelligence</small><h3>Explain · Route · Summarize · Forecast</h3></article>
        <article><span>02</span><small>Core records</small><h3>Identity · Care plan · Dose events · Health observations</h3></article>
        <article><span>01</span><small>Connections</small><h3>Devices · Labs · Clinical · Pharmacy · Business systems</h3></article>
      </div>
      <div className="jin-system-rule"><strong>Nonnegotiable rule</strong><p>Jin can automate workflow. It cannot silently become the prescriber, diagnose a condition or change a provider assigned dose.</p></div>
    </section>

    <section className="jin-closing"><p className="jin-kicker"><span/>Connected care, made useful</p><h2>Your health devices collect the data. Rejuvonix helps you know what to do next.</h2><p>Start with provider guided care, then connect the signals that make follow through easier to see and support.</p><div><Link className="jin-primary" href="/eligibility">Explore care options <span>→</span></Link><Link className="jin-secondary" href="/membership">View membership</Link></div><small>Connecting a device does not guarantee treatment eligibility or a prescription.</small></section>
  </>;
}
