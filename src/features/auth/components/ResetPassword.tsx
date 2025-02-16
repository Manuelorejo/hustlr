import AuthLayout from "./AuthLayout";
import { Link } from "react-router-dom";

export function ResetPassword() {
  return (
    <AuthLayout
      title="Reset Password"
      subTitle="Enter your new password to reset your account access"
    >
      <form className="w-full space-y-2">
        <>
          <label htmlFor="newPassword" className="label">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            className="input"
            placeholder="Enter your new password"
            autoFocus
          />
        </>
        <>
          <label htmlFor="confirmPassword" className="label">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="input"
            placeholder="Confirm your new password"
          />
        </>
        <button type="submit" className="button-primary">Reset Password</button>
      </form>
      <p className="font-semibold">
        Remembered your password? <Link to="/login" className="text-primary">Login</Link>
      </p>
    </AuthLayout>
  );
}
