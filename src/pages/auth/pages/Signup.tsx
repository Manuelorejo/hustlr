import AuthLayout from "./AuthLayout";
import { Link } from "react-router-dom";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useState } from "react";
import { useSignUp } from "../auth.api";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate: signUpUser, isPending } = useSignUp();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" }
  });

  const password = watch("password");

  const onSubmit = (data: { firstName: string; lastName: string; email: string; password: string; confirmPassword: string }) => {
    signUpUser(data);
  };

  return (
    <AuthLayout
      title="Join Us Today"
      subTitle="Create your account and start your journey to new opportunities"
    >
      <form className="w-full space-y-2" onSubmit={handleSubmit(onSubmit)}>
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
            {...register("lastName", { required: "Last Name is required." })}
          />
          {errors.lastName && <p className="text-red-500 italic text-xs">{errors.lastName.message}</p>}
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
            {...register("firstName", { required: "First Name is required." })}
          />
          {errors.firstName && <p className="text-red-500 italic text-xs">{errors.firstName.message}</p>}
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
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format.",
              },
            })}
          />
          {errors.email && <p className="text-red-500 italic text-xs">{errors.email.message}</p>}
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
              {...register("password", {
                required: "Password is required.",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must be at least 8 characters, include a number, uppercase, lowercase, and special character.",
                },
              })}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VscEyeClosed className="text-2xl" /> : <VscEye className="text-2xl" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 italic text-xs">{errors.password.message}</p>}
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
              {...register("confirmPassword", {
                required: "Please confirm your password.",
                validate: (value) => value === password || "Passwords do not match.",
              })}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <VscEyeClosed className="text-2xl" /> : <VscEye className="text-2xl" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 italic text-xs">{errors.confirmPassword.message}</p>}
        </>
        <button type="submit" className="button-primary" disabled={isPending}>
          {isPending ? <AiOutlineLoading3Quarters className="text-xl animate-spin" /> : "Sign Up"}
        </button>
      </form>
      <p className="font-semibold">Already have an account? <Link to="/auth/login" className="text-primary">Login</Link></p>
    </AuthLayout>
  );
}
