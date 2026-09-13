import { SiteHeader } from "../components/SiteChrome";
import CognitoAuthEntry from "../components/CognitoAuthEntry";

export default function SignInPage() {
  return <main className="detail-page auth-page"><SiteHeader/><section className="auth-shell"><div className="auth-photo"><img src="/rejuvonix-member-phone.png" alt="Rejuvonix member accessing care from home"/><div><p className="detail-kicker">Welcome back</p><h1>Your care is close.</h1></div></div><CognitoAuthEntry mode="sign-in"/></section></main>;
}
