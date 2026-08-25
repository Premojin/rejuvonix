import { SiteHeader } from "../components/SiteChrome";
import SimulatedAccountFlow from "../components/SimulatedAccountFlow";
export default function SignInPage(){return <main className="detail-page auth-page"><SiteHeader/><section className="auth-shell"><div className="auth-photo"><img src="/signin-member-unique.png" alt="A member reviewing the Rejuvonix experience from home"/><div><p className="detail-kicker">Welcome back</p><h1>Your journey is close.</h1></div></div><SimulatedAccountFlow mode="sign-in"/></section></main>}
