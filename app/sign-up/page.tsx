import {SiteHeader} from "../components/SiteChrome";
import CognitoAuthEntry from "../components/CognitoAuthEntry";

export default function SignUpPage(){return <main className="detail-page auth-page"><SiteHeader/><section className="auth-shell"><div className="auth-photo"><img src="/testimonial-unique-1.jpg" alt="A middle-aged woman beginning her Rejuvonix journey from home"/><div><p className="detail-kicker">Begin securely</p><h1>Your care path starts here.</h1></div></div><CognitoAuthEntry mode="sign-up"/></section></main>}
