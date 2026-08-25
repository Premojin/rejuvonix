import {SiteHeader} from "../components/SiteChrome";
import SimulatedAccountFlow from "../components/SimulatedAccountFlow";

export default function SignUpPage(){return <main className="detail-page auth-page"><SiteHeader/><section className="auth-shell"><div className="auth-photo"><img src="/signin-member-unique.png" alt="A member reviewing the Rejuvonix experience from home"/><div><p className="detail-kicker">Explore the journey</p><h1>Your care path, previewed.</h1></div></div><SimulatedAccountFlow mode="sign-up"/></section></main>}
