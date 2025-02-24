import { useForm } from "react-hook-form";
import { useSearchParams, Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { useResetPassword } from "../auth.api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type ResetPasswordForm = {
  password: string;
  confirmPassword: string;
};

export function ResetPassword() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetPasswordForm>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const {mutate:resetPassword, isPending} = useResetPassword();

  const onSubmit = (data: ResetPasswordForm) => {
    if (!token) return;
    resetPassword({ 
      token, 
      password: data.password, 
      confirmPassword: data.confirmPassword 
    });
  };

  return (
    <AuthLayout
      title="Reset Password"
      subTitle="Enter your new password to reset your account access"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-2">
        <div>
          <label htmlFor="newPassword" className="label">New Password</label>
          <input
            type="password"
            id="newPassword"
            className="input"
            placeholder="Enter your new password"
            autoFocus
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="label">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="input"
            placeholder="Confirm your new password"
            {...register("confirmPassword", { 
              required: "Please confirm your password", 
              validate: value => value === watch("password") || "Passwords do not match" 
            })}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>

        <button 
          type="submit" 
          className="button-primary"
          disabled={isPending}
        >
          {isPending ? <AiOutlineLoading3Quarters className="text-xl animate-spin" /> : "Reset Password"}
        </button>
      </form>

      <p className="font-semibold">
        Remembered your password? <Link to="/auth/login" className="text-primary">Login</Link>
      </p>
    </AuthLayout>
  );
}
