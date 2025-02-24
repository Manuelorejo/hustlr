import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient, { handleApiError } from "../../api/index";
import { useAuthStore } from "./auth.store";
import { User } from "./auth.types";

// 🔹 Sign Up Hook
export const useSignUp = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (payload: User) => {
      try {
        const response = await apiClient.post("/auth/signup", payload);
        return response.data;
      } catch (error) {
        handleApiError(error, "Failed to sign up. Try again.");
        throw error;
      }
    },
    onSuccess: (response) => {
      toast.success(response?.notification || "Account created successfully! Please log in.");
      navigate("/auth/login");
    },
    onError: (error) => {
      toast.error(error?.message || "Sign-up failed. Please try again.");
    },
  });
};

// 🔹 Login Hook
export const useLogin = () => {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      try {
        const response = await apiClient.post("/auth/login", payload);
        return response.data;
      } catch (error) {
        handleApiError(error, "Failed to log in. Try again.");
        throw error;
      }
    },
    onSuccess: (response) => {
      setAuth(response?.data);
      toast.success(response?.notification || "Successful Login");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error?.message || "Login failed. Please try again.");
    },
  });
};

// 🔹 Logout Hook
export const useLogout = () => {
  const removeAuth = useAuthStore((state) => state.removeAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      try {
        const response = await apiClient.post("/auth/logout");
        return response.data;
      } catch (error) {
        handleApiError(error, "Failed to log out. Try again.");
        throw error;
      }
    },
    onSuccess: (response) => {
      removeAuth();
      toast.success(response?.notification || "Logged out successfully.");
      navigate("/auth/login");
    },
    onError: (error) => {
      toast.error(error?.message || "Logout failed. Please try again.");
    },
  });
};

// 🔹 Password Reset Request Hook (Step 1 - Request Reset)
export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      try {
        const response = await apiClient.post("/auth/password-reset/request", { email });
        return response.data;
      } catch (error) {
        handleApiError(error, "Failed to request password reset. Try again.");
        throw error;
      }
    },
    onSuccess: (response) => {
      toast.success(response?.notification || "Password reset email sent. Check your inbox.");
    },
    onError: (error) => {
      toast.error(error?.message || "Password reset request failed. Try again.");
    },
  });
};

// 🔹 Password Reset Hook (Step 2 - Reset Password)
export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: { token: string; password: string; confirmPassword: string }) => {
      try {
        const response = await apiClient.post("/auth/password-reset/reset", payload);
        return response.data;
      } catch (error) {
        handleApiError(error, "Failed to reset password. Try again.");
        throw error;
      }
    },
    onSuccess: (response) => {
      toast.success(response?.notification || "Password reset successful! You can now log in.");
      navigate("/auth/login");
    },
    onError: (error) => {
      toast.error(error?.message || "Password reset failed. Try again.");
    },
  });
};
