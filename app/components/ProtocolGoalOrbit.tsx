"use client";

export function ProtocolGoalOrbit({goals}:{goals:string[]}){
  return <div className="protocol-goal-orbits" aria-label={`Related goals: ${goals.join(", ")}`}>
    {goals.map((goal,index)=><div className={`protocol-goal-orbit-ring protocol-goal-orbit-ring--${index%2===0?"clockwise":"counter"}`} key={goal}>
      <span>{goal}</span>
    </div>)}
  </div>;
}
