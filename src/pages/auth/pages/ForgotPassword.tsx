import AuthLayout from "./AuthLayout";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

export function ForgotPassword() {
  return (
    <AuthLayout
      title="Forgot Password"
      subTitle="Enter your email address and we'll send you a token to reset your password"
    >
      <form className="w-full space-y-2">
        <>
          <label htmlFor="emailAddress" className="label">
            Email Address
          </label>
          <input
            type="email"
            id="emailAddress"
            className="input"
            placeholder="Enter your email"
            autoFocus
          />
        </>
        <button type="submit" className="button-primary">Send Token</button>
      </form>
      <Link to="/login" className="font-semibold flex items-center gap-2"><FaArrowLeftLong />Back to login</Link>  
    </AuthLayout>
  );
}


export function VerifyToken() {
    return (
      <AuthLayout
        title="Verify Token"
        subTitle="Enter the token sent to your email to reset your password"
      >
        <form className="w-full space-y-2">
          <>
            <label htmlFor="token" className="label">
              Token
            </label>
            <input
              type="text"
              id="token"
              className="input"
              placeholder="Enter the token"
              autoFocus
            />
          </>
          <button type="submit" className="button-primary">Verify Token</button>
        </form>
        <p className="font-semibold">
          Didn't receive a token? <Link to="/forgot-password" className="text-primary">Resend Token</Link>
        </p>
      </AuthLayout>
    );
  }