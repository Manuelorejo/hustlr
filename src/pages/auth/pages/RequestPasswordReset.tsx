import { useForm } from "react-hook-form";
import AuthLayout from "./AuthLayout";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRequestPasswordReset } from "../auth.api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function RequestPasswordReset() {
  const { register, handleSubmit, formState: { errors } } = useForm<{ email: string }>();
  const {mutate: requestPasswordReset, isPending} = useRequestPasswordReset();

  const onSubmit = (data: { email: string }) => {
    requestPasswordReset(data.email);
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subTitle="Enter your email address and we'll send you a link to reset your password"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-2">
        <div>
          <label htmlFor="emailAddress" className="label">
            Email Address
          </label>
          <input
            type="email"
            id="emailAddress"
            className="input"
            placeholder="Enter your email"
            autoFocus
            {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/, message: "Invalid email format" } })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <button 
          type="submit" 
          className="button-primary"
          disabled={isPending}
        >
          {isPending ? <AiOutlineLoading3Quarters className="text-xl animate-spin" /> : "Send Token"}
        </button>
      </form>
      <Link to="/auth/login" className="font-semibold flex items-center gap-2">
        <FaArrowLeftLong /> Back to login
      </Link>  
    </AuthLayout>
  );
}
