"use client";

import {useEffect,useRef,useState} from "react";
import {ProtocolCard} from "./ProtocolCard";
import type {ProtocolItem} from "./protocol-data";

export function ProtocolShelf({protocols}:{protocols:ProtocolItem[]}){
  const ref=useRef<HTMLDivElement>(null);
  const [atStart,setAtStart]=useState(true);
  const [atEnd,setAtEnd]=useState(false);
  const update=()=>{const node=ref.current;if(!node)return;setAtStart(node.scrollLeft<=2);setAtEnd(node.scrollLeft+node.clientWidth>=node.scrollWidth-2)};
  useEffect(()=>{update();const node=ref.current;if(!node)return;node.addEventListener("scroll",update,{passive:true});window.addEventListener("resize",update);return()=>{node.removeEventListener("scroll",update);window.removeEventListener("resize",update)}},[]);
  const move=(direction:number)=>{const node=ref.current;if(!node)return;const card=node.querySelector<HTMLElement>(".protocol-product-card");node.scrollBy({left:direction*(card?.offsetWidth??420)+direction*22,behavior:"smooth"})};
  return <div className="protocol-shelf-controls"><button type="button" className="protocol-shelf-arrow" aria-label="Scroll protocols left" onClick={()=>move(-1)} disabled={atStart}>←</button><div className="protocol-scroll-shell" ref={ref} aria-label="Protocols horizontal list"><div className="protocol-scroll-track">{protocols.map((protocol,index)=><ProtocolCard protocol={protocol} index={index} key={protocol.slug}/>)}</div></div><button type="button" className="protocol-shelf-arrow" aria-label="Scroll protocols right" onClick={()=>move(1)} disabled={atEnd}>→</button></div>;
}
