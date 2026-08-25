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
export function CareJourney(){return <div className="journey-page-grid">{careJourney.map(([number,title,copy])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>}
