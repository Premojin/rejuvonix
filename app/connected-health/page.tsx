import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { JinConnectedHealthExperience } from "../components/JinConnectedHealthExperience";

export const metadata: Metadata = {
  title: "Jin Connected Health | Rejuvonix",
  description: "See how Rejuvonix connects provider assigned treatment tracking, health devices, the Four Pillars and Jin guidance in one member experience.",
};

export default function ConnectedHealthPage(){
  return <main className="jin-health-page">
    <SiteHeader/>
    <JinConnectedHealthExperience/>
    <SiteFooter/>
  </main>;
}
