import AuthLayout from "./AuthLayout";
import { Link } from "react-router-dom";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useState } from "react";

export function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <AuthLayout
      title="Join Us Today"
      subTitle="Create your account and start your journey to new opportunities"
    >
      <form className="w-full space-y-2">
        <>
          <label htmlFor="lastName" className="label">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="input"
            autoFocus
            placeholder="Enter your last name"
          />
        </>
        <>
          <label htmlFor="firstName" className="label">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="input"
            placeholder="Enter your first name"
          />
        </>
        <>
          <label htmlFor="emailAddress" className="label">
            Email Address
          </label>
          <input
            type="email"
            id="emailAddress"
            className="input"
            placeholder="Enter your email"
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
        <>
          <label htmlFor="confirmPassword" className="label">
            Confirm Password
          </label>
          <div className="relative w-full">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              className="input pr-10"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <VscEyeClosed className="text-2xl" /> : <VscEye className="text-2xl" />}
            </button>
          </div>
        </>
        <button type="submit" className="button-primary">Sign Up</button>
      </form>
      <p className="font-semibold">Already have an account? <Link to="/login" className="text-primary">Login</Link></p>
    </AuthLayout>
  );
}
