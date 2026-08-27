import type { Metadata } from "next";
import "./globals.css";
import "./eligibility.css";
import "./eligibility-programs.css";
import "./clinical-draft.css";
import "./demo-account.css";
import "./jin-connected-health.css";
import "./jin-account.css";
export const metadata: Metadata = { title: "Rejuvonix | Online Weight Care", description: "Explore provider guided telehealth, connected health tracking and ongoing wellness support through Rejuvonix.", icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" }, openGraph: { title: "Rejuvonix | Online Weight Care", description: "Personalized care and connected progress for how you want to live.", url: "https://rejuvonix.otrayoe.chatgpt.site", siteName: "Rejuvonix", images: [{url:"https://rejuvonix.otrayoe.chatgpt.site/og.png",width:1200,height:630,alt:"Rejuvonix provider guided wellness programs"}], type:"website" }, twitter: { card:"summary_large_image", title:"Rejuvonix | Online Weight Care", description:"Personalized care and connected progress for how you want to live.", images:["https://rejuvonix.otrayoe.chatgpt.site/og.png"] } };
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }
