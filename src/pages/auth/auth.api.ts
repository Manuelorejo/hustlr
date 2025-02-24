import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "./auth.store";
import { useNavigate } from "react-router-dom";
import apiClient, { handleApiError } from "../../api/index";
import { User } from "./auth.types";

// 🔹 Sign Up Hook
export const useSignUp = () => {
  return useMutation({
    mutationFn: async (payload: User) => {
      try {
        const response = await apiClient.post("/users/signup", payload);
        return response.data;
      } catch (error) {
        handleApiError(error, "Failed to sign up. Try again.");
        throw error;
      }
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
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
      navigate("/dashboard");
    },
  });
};

// 🔹 Logout Hook
export const useLogout = () => {
  const logoutUser = useAuthStore((state) => state.logout);
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
      logoutUser();
      navigate("/login");
    },
  });
};
