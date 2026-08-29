"use client";

import {useEffect,useMemo,useRef} from "react";

type Glyph={id:string;char:string;angle:number};

export function ProtocolGoalOrbit({goals}:{goals:string[]}){
  const rearRefs=useRef(new Map<string,HTMLSpanElement>());
  const frontRefs=useRef(new Map<string,HTMLSpanElement>());
  const glyphs=useMemo<Glyph[]>(()=>{
    const result:Glyph[]=[];
    goals.forEach((goal,goalIndex)=>{
      const chars=Array.from(goal.toUpperCase());
      chars.forEach((char,charIndex)=>{
        if(char===" ")return;
        const total=chars.length+2;
        result.push({id:`${goalIndex}-${charIndex}`,char,angle:(goalIndex/goals.length)*Math.PI*2+(charIndex/total)*Math.PI*1.45-.72});
      });
    });
    return result;
  },[goals]);

  useEffect(()=>{
    let frame=0;
    const started=performance.now();
    const tick=(now:number)=>{
      const phase=((now-started)/15000)*Math.PI*2;
      glyphs.forEach((glyph)=>{
        const angle=glyph.angle+phase;
        const depth=Math.sin(angle);
        const x=Math.cos(angle)*178;
        const y=Math.sin(angle)*78;
        const scale=.86+Math.max(depth,0)*.14;
        const opacity=.28+Math.max(depth,0)*.72;
        const rotation=(Math.atan2(Math.cos(angle)*78,-Math.sin(angle)*178)*180/Math.PI)+90;
        const transform=`translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${depth*34}px) rotate(${rotation}deg) scale(${scale})`;
        const rear=rearRefs.current.get(glyph.id);
        const front=frontRefs.current.get(glyph.id);
        if(rear){rear.style.transform=transform;rear.style.opacity=String(depth<0?opacity:0)}
        if(front){front.style.transform=transform;front.style.opacity=String(depth>=0?opacity:0)}
      });
      frame=requestAnimationFrame(tick);
    };
    frame=requestAnimationFrame(tick);
    return()=>cancelAnimationFrame(frame);
  },[glyphs]);

  const renderLayer=(layer:"rear"|"front")=><div className={`protocol-character-orbit protocol-character-orbit--${layer}`} aria-hidden="true">{glyphs.map((glyph)=><span key={glyph.id} ref={(node)=>{if(node)(layer==="rear"?rearRefs:frontRefs).current.set(glyph.id,node);else (layer==="rear"?rearRefs:frontRefs).current.delete(glyph.id)}}>{glyph.char}</span>)}</div>;
  return <div className="protocol-vial-orbit" aria-label={`Related goals: ${goals.join(", ")}`}>{renderLayer("rear")}{renderLayer("front")}</div>;
}
