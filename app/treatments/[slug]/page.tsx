import { notFound } from "next/navigation";
import { ProductPage } from "../../components/ProductPage";
import { WegovyInjectionExperience } from "../../components/WegovyInjectionExperience";
import { getProduct, products } from "../../components/product-data";

export function generateStaticParams() { return products.map(product => ({slug: product.slug})); }
export default async function TreatmentDetail({params}: {params: Promise<{slug:string}>}) { const {slug} = await params; const product = getProduct(slug); if (!product) notFound(); if(slug==="wegovy-injection") return <WegovyInjectionExperience/>; return <ProductPage product={product} />; }
