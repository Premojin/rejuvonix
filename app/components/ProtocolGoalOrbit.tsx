"use client";

import {useEffect, useMemo, useState} from "react";

const REVOLUTION_MS = 13_000;

function useReducedMotion(){
  const [reducedMotion,setReducedMotion]=useState(false);
  useEffect(()=>{
    const media=window.matchMedia("(prefers-reduced-motion: reduce)");
    const update=()=>setReducedMotion(media.matches);
    update();
    media.addEventListener?.("change",update);
    return ()=>media.removeEventListener?.("change",update);
  },[]);
  return reducedMotion;
}

export function ProtocolGoalOrbit({goals}:{goals:string[]}){
  const reducedMotion=useReducedMotion();
  const [phase,setPhase]=useState(0);
  const ribbon=useMemo(()=>{
    const base=goals.map((goal)=>goal.toUpperCase()).join("  •  ");
    return base ? `${base}  •  ${base}  •  ` : "";
  },[goals]);

  useEffect(()=>{
    if(reducedMotion||!ribbon)return;
    let frame=0;
    const started=performance.now();
    const animate=(now:number)=>{
      setPhase(-(((now-started)%REVOLUTION_MS)/REVOLUTION_MS*Math.PI*2));
      frame=requestAnimationFrame(animate);
    };
    frame=requestAnimationFrame(animate);
    return ()=>cancelAnimationFrame(frame);
  },[reducedMotion,ribbon]);

  const glyphs=Array.from(ribbon);
  const renderPlane=(front:boolean)=>glyphs.map((character,index)=>{
    const angle=phase+(index/glyphs.length)*Math.PI*2;
    const depth=Math.sin(angle);
    const isFront=depth>=0;
    if(isFront!==front)return null;
    const x=Math.cos(angle)*39;
    const y=Math.sin(angle)*7;
    const scale=.84+(depth+1)*.08;
    const opacity=.34+(depth+1)*.33;
    const z=Math.round(depth*34);
    return <span className="protocol-goal-orbit-glyph" key={`${front?"front":"rear"}-${index}`} aria-hidden="true" style={{left:`calc(50% + ${x}%)`,top:`calc(31% + ${y}%)`,opacity:front?opacity:opacity*.72,transform:`translate(-50%, -50%) translateZ(${z}px) scale(${scale})`}}>{character===" "?"\u00a0":character}</span>;
  });

  return <>
    <div className="protocol-goal-orbit-guide" aria-hidden="true" />
    <div className="protocol-goal-orbit-plane protocol-goal-orbit-plane--rear" aria-hidden="true">{renderPlane(false)}</div>
    <div className="protocol-goal-orbit-plane protocol-goal-orbit-plane--front" role="img" aria-label={`Related goals: ${goals.join(", ")}`}>{renderPlane(true)}</div>
  </>;
}
