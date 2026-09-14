import Link from "next/link";
import { SiteHeader } from "../components/SiteChrome";
import CognitoRecoveryEntry from "../components/CognitoRecoveryEntry";

export default function ForgotPasswordPage() {
  return <main className="detail-page auth-page"><SiteHeader/><section className="auth-shell auth-recovery-shell"><div className="auth-recovery-intro"><p className="detail-kicker">Secure account recovery</p><h1>Forgot your password?</h1><p>Reset your password on the secure Cognito sign-in screen. Rejuvonix never receives or stores your password or reset code.</p><div className="auth-recovery-steps"><span>01</span><p>Continue to secure sign in.</p><span>02</span><p>Choose “Forgot password?” and follow the verification steps.</p><span>03</span><p>Return here and sign in with your new password.</p></div></div><div className="auth-form auth-experience-form"><CognitoRecoveryEntry/><p className="auth-links"><Link href="/sign-in">Back to sign in</Link></p><small>If an account exists for the address you provide to Cognito, its reset instructions will be handled there.</small></div></section></main>;
}
