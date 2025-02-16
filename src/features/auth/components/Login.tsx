import AuthLayout from "./AuthLayout";
import { Link } from "react-router-dom";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useState } from "react";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout
      title="Welcome Back to Hustlr"
      subTitle="Sign in to discover your next great opportunity"
    >
      <form className="w-full flex flex-col gap-2">
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
        <>
          <label htmlFor="password" className="label">
            Password
          </label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="input pr-10"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VscEyeClosed className="text-2xl" /> : <VscEye className="text-2xl" />}
            </button>
          </div>
        </>
        <Link to="/forgot-password" className="text-sm font-semibold ml-auto text-primary">Forgot Password</Link>
        <button type="submit" className="button-primary">Login</button>
      </form>
      <p className="font-semibold">Don't have an account? <Link to="/signup" className="text-primary">Sign Up</Link></p>
    </AuthLayout>
  );
}