import AuthLayout from "./AuthLayout";
import { Link } from "react-router-dom";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useState } from "react";
import { useLogin } from "../auth.api";
import { useForm } from "react-hook-form";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: loginUser, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  const onSubmit = (data: { email: string; password: string }) => {
    loginUser(data);
  };

  return (
    <AuthLayout
      title="Welcome Back to Hustlr"
      subTitle="Sign in to discover your next great opportunity"
    >
      <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
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
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format.",
              },
            })}
          />
          {errors.email && <p className="text-faulty italic text-xs">{errors.email.message}</p>}
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
              {...register("password", { required: "Password is required." })}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VscEyeClosed className="text-2xl" /> : <VscEye className="text-2xl" />}
            </button>
          </div>
          {errors.password && <p className="text-faulty italic text-xs">{errors.password.message}</p>}
        </>
        <Link to="/forgot-password" className="text-sm font-semibold ml-auto text-primary">
          Forgot Password
        </Link>
        <button type="submit" className="button-primary" disabled={isPending}>
          {isPending ? "Processing..." : "Login"}
        </button>
      </form>
      <p className="font-semibold">
        Don't have an account? <Link to="/signup" className="text-primary">Sign Up</Link>
      </p>
    </AuthLayout>
  );
}
