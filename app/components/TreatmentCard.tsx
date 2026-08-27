import Link from "next/link";
import type { Product } from "./product-data";

export function TreatmentCard({product,index}:{product:Product;index:number}){
  return <Link className={`treatment-card card-${index+1}`} href={`/treatments/${product.slug}`}>
    <div className="card-top"><span>{product.status}</span><span>{String(index+1).padStart(2,"0")}</span></div>
    <div className="product-stage"><img src={product.image} alt={`${product.name} product packaging`}/></div>
    <div className="card-content"><p>{product.ingredient}</p><h3>{product.name}</h3><span>{product.format} · {product.cadence}</span><span className="treatment-card-cta">View treatment <b>→</b></span></div>
  </Link>;
}
