import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "./auth.store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient, { handleApiError } from "../../api/index";
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
    onSuccess: () => {
      toast.success("Account created successfully! Please log in.");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message || "Sign-up failed. Please try again.");
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
      toast.success("Successful Login");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message || "Login failed. Please try again.");
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
    onSuccess: () => {
      removeAuth();
      toast.success("Logged out successfully.");
      navigate("/auth/login");
    },
    onError: (error) => {
      toast.error(error.message || "Logout failed. Please try again.");
    },
  });
};
