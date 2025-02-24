import AuthLayout from "./AuthLayout";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

export function RequestPasswordReset() {
  return (
    <AuthLayout
      title="Forgot Password"
      subTitle="Enter your email address and we'll send you a link to reset your password"
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