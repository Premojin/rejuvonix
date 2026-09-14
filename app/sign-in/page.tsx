import { SiteHeader } from "../components/SiteChrome";
import CognitoAuthEntry from "../components/CognitoAuthEntry";

export default function SignInPage() {
  return <main className="detail-page auth-page"><SiteHeader/><section className="auth-shell auth-experience-shell"><div className="auth-photo"><img src="/rejuvonix-member-phone.png" alt="Rejuvonix member accessing care from home"/><div><p className="detail-kicker">Welcome back</p><h1>Your care is close.</h1><p>Private, provider-guided support starts with a secure account.</p></div></div><div className="auth-form auth-experience-form"><p className="detail-kicker">Patient secure access</p><h1>Sign in to Rejuvonix</h1><p>Use your secure Rejuvonix account to continue exploring your care options.</p><CognitoAuthEntry mode="sign-in"/><div className="auth-links"><a href="/forgot-password">Forgot password?</a><span>New to Rejuvonix? <a href="/sign-up">Create account</a></span></div><small>Passwords, verification, and account recovery are managed securely by Cognito. Rejuvonix does not store your password.</small></div></section></main>;
}
