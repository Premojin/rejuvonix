"use client";

import {useEffect,useState,type MouseEvent} from "react";

export type PageSectionItem={id:string;label:string};

export function PageSectionLegend({items,label="Page sections"}:{items:PageSectionItem[];label?:string}){
  const[active,setActive]=useState(0);
  const snapToSection=(event:MouseEvent<HTMLAnchorElement>,id:string,index:number)=>{
    event.preventDefault();
    const target=document.getElementById(id);
    if(!target)return;
    const header=document.querySelector<HTMLElement>(".detail-header");
    const offset=header?.getBoundingClientRect().height||0;
    setActive(index);
    window.history.replaceState(null,"",`#${id}`);
    window.scrollTo({top:Math.max(0,window.scrollY+target.getBoundingClientRect().top-offset),behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
  };
  useEffect(()=>{
    const elements=items.map(item=>document.getElementById(item.id)).filter((item):item is HTMLElement=>Boolean(item));
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){const index=items.findIndex(item=>item.id===entry.target.id);if(index>=0)setActive(index)}
    }),{rootMargin:"-28% 0px -62%",threshold:0});
    elements.forEach(element=>observer.observe(element));
    return()=>observer.disconnect();
  },[items]);
  return <nav className="weightloss-snap-legend" aria-label={label}>{items.map((item,index)=><a key={`${item.id}-${item.label}`} className={active===index?"active":""} aria-current={active===index?"location":undefined} href={`#${item.id}`} onClick={event=>snapToSection(event,item.id,index)}><span aria-hidden="true"></span><strong>{item.label}</strong></a>)}</nav>;
}
