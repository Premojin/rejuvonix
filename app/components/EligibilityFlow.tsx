"use client";
import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import WeightLossClinicalDraft from "./WeightLossClinicalDraft";

export const programConfigs = {
  "weight-loss":{name:"Weight Loss",kicker:"Weight care, organized around you",headline:"Start with your goals and your starting point.",description:"Share a few general details before continuing to the clinical portion of a weight-care assessment.",questions:[
    {kicker:"Your priority",title:"What matters most to you right now?",options:["Long-term weight management","Feeling better day to day","Reducing weight-related health risks","Building sustainable routines"]},
    {kicker:"Your experience",title:"What kind of support are you looking for?",options:["I am exploring my options","I have tried lifestyle changes","I have used prescription weight care","I am not sure yet"]},
    {kicker:"Activity",title:"How active are you usually?",options:["Very active","Moderately active","Not very active","It varies"]},
    {kicker:"Daily routine",title:"How consistent does your current routine feel?",options:["Very consistent","Somewhat consistent","Difficult to maintain","I am starting fresh"]},
  ],measurements:true},
  "performance":{name:"Performance",kicker:"Strength, energy and recovery",headline:"Build a clearer picture of your performance goals.",description:"Begin with your priorities and daily routine. Clinical questions will be reviewed separately for this pathway.",questions:[
    {kicker:"Your priority",title:"Where would you most like support?",options:["Energy","Strength","Recovery","Overall resilience"]},
    {kicker:"Activity",title:"How active are you usually?",options:["Very active","Moderately active","Not very active","It varies"]},
    {kicker:"Recovery",title:"How does recovery usually feel?",options:["Consistent","Slower than I would like","Unpredictable","I am not sure"]},
    {kicker:"Daily routine",title:"What would make the biggest difference?",options:["A clearer plan","Better consistency","Professional guidance","Understanding my options"]},
  ],measurements:false},
  "sexual-health":{name:"Sexual Health",kicker:"Private, respectful support",headline:"Start with what matters to you.",description:"This private starting point organizes your goals without making a diagnosis or treatment decision.",questions:[
    {kicker:"Your priority",title:"What would you like help understanding?",options:["Confidence","Connection and intimacy","Changes I have noticed","Available care options"]},
    {kicker:"Timing",title:"How long has this been on your mind?",options:["Recently","For several months","For a year or longer","I am only exploring"]},
    {kicker:"Support",title:"What kind of next step feels most useful?",options:["Education","A private provider conversation","A complete assessment","I am not sure"]},
    {kicker:"Comfort",title:"How ready do you feel to discuss this with a provider?",options:["Ready now","Almost ready","I have questions first","I am only browsing"]},
  ],measurements:false},
  "hair-restoration":{name:"Hair Restoration",kicker:"A thoughtful first step",headline:"Tell us what you want to understand about your hair.",description:"Start with your concerns and goals. A provider must review clinical history before recommending treatment.",questions:[
    {kicker:"Your priority",title:"What would you most like to address?",options:["Thinning appearance","Hairline changes","Overall density","Preventive guidance"]},
    {kicker:"Timing",title:"When did you first notice a change?",options:["Recently","Within the past year","More than a year ago","I am not sure"]},
    {kicker:"Pattern",title:"How would you describe the change?",options:["Gradual","Sudden","Comes and goes","I am not sure"]},
    {kicker:"Next step",title:"What would be most helpful?",options:["Understanding possible causes","Exploring treatment options","Creating a consistent plan","Speaking with a provider"]},
  ],measurements:false},
  "skin-restoration":{name:"Skin Regeneration",kicker:"Care for your skin goals",headline:"Begin with the changes that matter to you.",description:"This starting point helps organize your priorities before any provider-led clinical assessment.",questions:[
    {kicker:"Your priority",title:"What would you most like to support?",options:["Texture","Tone","Clarity","Healthy-looking radiance"]},
    {kicker:"Timing",title:"How long has this been a priority?",options:["Recently","For several months","For a year or longer","I am exploring"]},
    {kicker:"Routine",title:"How would you describe your current routine?",options:["Consistent","Simple","Difficult to maintain","I do not have one"]},
    {kicker:"Next step",title:"What would be most useful?",options:["Education","A personalized routine","Exploring clinical options","Speaking with a provider"]},
  ],measurements:false},
} as const;

type ProgramSlug=keyof typeof programConfigs;

export default function EligibilityFlow({program}: {program:ProgramSlug}){
  const config=programConfigs[program];
  const[step,setStep]=useState(0);
  const[answers,setAnswers]=useState<string[]>([]);
  const[feet,setFeet]=useState(""),[inches,setInches]=useState(""),[currentWeight,setCurrentWeight]=useState(""),[goalWeight,setGoalWeight]=useState("");
  const cardRef=useRef<HTMLDivElement>(null);
  const questionCount=config.questions.length+(config.measurements?1:0);
  const totalSteps=questionCount+2;
  const valid=Number(feet)>=3&&Number(feet)<=8&&Number(inches)>=0&&Number(inches)<12&&Number(currentWeight)>=50&&Number(currentWeight)<=600&&Number(goalWeight)>=50&&Number(goalWeight)<=600;
  const choose=(value:string)=>{const next=[...answers];next[step]=value;setAnswers(next);window.setTimeout(()=>setStep(current=>current+1),180)};
  const isMeasurement=config.measurements&&step===config.questions.length;
  const isReview=step===questionCount;
  const isHandoff=step===questionCount+1;
  const progress=Math.min(100,((step+1)/totalSteps)*100);
  useEffect(()=>{cardRef.current?.focus();},[step]);

  return <main className="eligibility-page"><a className="skip-link" href="#assessment-content">Skip to assessment</a><header className="eligibility-header"><Link className="eligibility-brand" href="/" aria-label="Rejuvonix home"><img src="/rejuvonix-logo-mark.png" alt=""/>REJUVONIX<span>.</span></Link><Link className="eligibility-switch" href="/eligibility">Change program</Link></header><div className="eligibility-progress" role="progressbar" aria-label="Assessment progress" aria-valuemin={0} aria-valuemax={totalSteps} aria-valuenow={step+1} aria-valuetext={`Step ${step+1} of ${totalSteps}`}><span style={{width:`${progress}%`}}/></div><section className="eligibility-shell"><aside className="eligibility-story"><p>{config.kicker}</p><h1>{config.headline}</h1><p>{config.description}</p><div className="eligibility-trust"><span aria-hidden="true">✓</span><div><strong>Provider review comes first</strong><small>These questions do not determine medical eligibility.</small></div></div></aside><div id="assessment-content" className="eligibility-card" ref={cardRef} tabIndex={-1}>{step>0&&<button type="button" className="eligibility-back" onClick={()=>setStep(current=>Math.max(0,current-1))}>← Back</button>}
    {step<config.questions.length&&<div className="eligibility-question" key={step}><p className="eligibility-kicker">{config.questions[step].kicker}</p><h2>{config.questions[step].title}</h2><p className="eligibility-step">Question {step+1} of {questionCount}</p><div className="eligibility-options">{config.questions[step].options.map(option=><button type="button" key={option} onClick={()=>choose(option)}><span>{option}</span><b aria-hidden="true">→</b></button>)}</div></div>}
    {isMeasurement&&<div className="eligibility-question"><p className="eligibility-kicker">Your starting point</p><h2>Add your current measurements.</h2><p className="eligibility-step">Question {step+1} of {questionCount}</p><div className="measurement-grid"><label>Height<div><input aria-label="Height in feet" inputMode="numeric" type="number" min="3" max="8" value={feet} onChange={e=>setFeet(e.target.value)}/><span>ft</span><input aria-label="Height in inches" inputMode="numeric" type="number" min="0" max="11" value={inches} onChange={e=>setInches(e.target.value)}/><span>in</span></div></label><label>Current weight<div><input aria-label="Current weight in pounds" inputMode="numeric" type="number" min="50" max="600" value={currentWeight} onChange={e=>setCurrentWeight(e.target.value)}/><span>lb</span></div></label><label>Goal weight<div><input aria-label="Goal weight in pounds" inputMode="numeric" type="number" min="50" max="600" value={goalWeight} onChange={e=>setGoalWeight(e.target.value)}/><span>lb</span></div></label></div><button className="eligibility-continue" disabled={!valid} onClick={()=>setStep(current=>current+1)}>Review my starting point <span>→</span></button></div>}
    {isReview&&program==="weight-loss"&&<WeightLossClinicalDraft onComplete={()=>setStep(current=>current+1)}/>}
    {isReview&&program!=="weight-loss"&&<div className="eligibility-question eligibility-result"><p className="eligibility-kicker">Your starting summary</p><h2>You are ready for the next part of the {config.name.toLowerCase()} assessment.</h2><p className="result-note">Your responses have not been submitted and no treatment decision has been made.</p><button className="eligibility-continue" onClick={()=>setStep(current=>current+1)}>Continue <span>→</span></button></div>}
    {isHandoff&&<div className="eligibility-question eligibility-handoff"><span className="handoff-mark" aria-hidden="true">✓</span><p className="eligibility-kicker">Assessment preview complete</p><h2>Continue to your member dashboard.</h2><p>Nothing has been submitted or saved. Return to the simulated member dashboard to continue your journey while production intake, consent and EmberFlow remain disconnected.</p><p><strong>A licensed provider, not this simulation, would determine whether treatment is appropriate and establish any medication, dose or treatment schedule.</strong></p><div className="handoff-actions"><Link className="eligibility-continue" href="/account?assessment=complete">Continue to member dashboard <span aria-hidden="true">→</span></Link><Link className="eligibility-signin" href="/sign-up">Create demo account</Link><Link className="eligibility-signin" href="/sign-in">Sign in to demo</Link></div><Link className="eligibility-secondary" href="/eligibility">Choose another program</Link><small>Use fictional information only. Completing an assessment does not guarantee treatment or a prescription.</small></div>}</div></section></main>;
}
