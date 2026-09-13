"use client";
import {useCallback,useEffect,useState} from "react";

export const careJourney = [
  ["01","Program selected","Choose the area where you want support."],
  ["02","Assessment complete","Review your answers and approved consent language before submission."],
  ["03","Submitted","Receive confirmation that your information entered the clinical workflow."],
  ["04","More information needed","Respond to a provider request, laboratory requirement or appointment step."],
  ["05","Review resumed","Your case returns to the independent provider for review."],
  ["06","Provider outcome","Receive the provider’s decision and next steps; treatment is never guaranteed."],
  ["07","Pharmacy handoff","If prescribed, follow independent pharmacy fulfillment status."],
  ["08","Follow-up","Complete required check-ins, laboratory work and provider visits."],
  ["09","Reassessment and renewal","Your provider decides whether care continues, changes, pauses or ends."],
] as const;

const journeyImages = [
  ["/program-weight-loss-success-v2.png", "A smiling woman showing the extra room in the waist of her older pants"],
  ["/complete-assessment.png", "A member reviewing an online health assessment"],
  ["/rejuvonix-member-phone.png", "A member receiving confirmation on her phone"],
  ["/wegovy-telehealth-visit.jpg", "A member responding during a telehealth visit"],
  ["/complete-provider-review.png", "A licensed provider reviewing a member's information"],
  ["/how-care-conversation-v2.png", "A provider explaining a clinical decision and next steps"],
  ["/complete-delivery.png", "A carefully prepared pharmacy delivery"],
  ["/complete-follow-care.png", "A member completing a required follow-up"],
  ["/membership-followup-v2.webp", "A member reviewing her ongoing care plan"],
] as const;

export function CareJourney({cinematic=false}:{cinematic?:boolean}){
  const[active,setActive]=useState(0);
  const change=useCallback((next:number)=>setActive((next+careJourney.length)%careJourney.length),[]);
  useEffect(()=>{
    if(!cinematic||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    const timer=window.setInterval(()=>setActive(current=>(current+1)%careJourney.length),5000);
    return()=>window.clearInterval(timer);
  },[cinematic]);
  if(!cinematic)return <div className="journey-page-grid">{careJourney.map(([number,title,copy])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>;
  return <div className="journey-story">
    <nav className="journey-story-rail" aria-label="Complete process stages">
      {careJourney.map(([number,title],index)=><button type="button" className={active===index?"active":""} aria-current={active===index?"step":undefined} key={number} onClick={()=>setActive(index)}><span>{number}</span><b>{title}</b><i><em></em></i></button>)}
    </nav>
    <div className="journey-story-frames" aria-live="polite">
      {careJourney.map(([number,title,copy],index)=><article className={`journey-story-frame ${active===index?"active":""}`} aria-hidden={active!==index} key={number}>
        <div className="journey-story-image">
          <img src={journeyImages[index][0]} alt={journeyImages[index][1]}/>
          <span className="journey-story-watermark" aria-hidden="true">{number}</span>
          <div className="journey-story-status"><i></i><span>Stage {number} of 09</span></div>
        </div>
        <div className="journey-story-copy">
          <div className="journey-story-count"><span>{number}</span><i></i><small>09</small></div>
          <p className="detail-kicker">Your care journey</p>
          <h3>{title}</h3>
          <p>{copy}</p>
          <div className="journey-story-next">{index<careJourney.length-1?<><span>Next</span><b>{careJourney[index+1][1]}</b></>:<><span>Complete process</span><b>Your provider guides what comes next.</b></>}</div>
        </div>
      </article>)}
      <div className="journey-story-arrows"><button type="button" onClick={()=>change(active-1)} aria-label="Previous process stage">←</button><span>{active+1} of 9</span><button type="button" onClick={()=>change(active+1)} aria-label="Next process stage">→</button></div>
    </div>
  </div>
}
