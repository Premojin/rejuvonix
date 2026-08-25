import EligibilityFlow from "../../components/EligibilityFlow";
import EligibilityProgramSelector from "../../components/EligibilityProgramSelector";

const programs=["weight-loss","performance","sexual-health","hair-restoration","skin-restoration"] as const;
type Program=(typeof programs)[number];
export function generateStaticParams(){return programs.map(program=>({program}));}

export default async function ProgramEligibilityPage({params}:{params:Promise<{program:string}>}){
  const {program}=await params;
  if(!programs.includes(program as Program)) return <EligibilityProgramSelector/>;
  return <EligibilityFlow program={program as Program}/>;
}
