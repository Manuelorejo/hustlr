import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "./profile.types";
import { useAuthStore } from "../auth/auth.store";
import { handleApiError } from "../../api";
import apiClient from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useGetProfile = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery<User, Error>({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const response = await apiClient.get("/profile");
        return response.data?.data;
      } catch (error) {
        handleApiError(error, "Failed to fetch profile data.");
        throw error;
      }
    },
    enabled: !!accessToken,
    staleTime: 10 * 60 * 1000,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { firstName?: string; lastName?: string }) => {
      try {
        const response = await apiClient.patch("/profile", data);
        return response.data?.data;
      } catch (error) {
        handleApiError(error, "Failed to update profile.");
        throw error;
      }
    },
    onSuccess: (response) => {
      toast.success(response?.notification || "Profile Update Successful");
      queryClient.invalidateQueries({ queryKey: ["profile"] });

    },
    onError: (error) => {
      toast.error(error?.message || "Profile update failed. Please try again");
    }
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data: {
      currentPassword: string;
      newPassword: string;
      confirmNewPassword: string;
    }) => {
      try {
        const response = await apiClient.patch("/profile/change-password", data);
        return response.data
      } catch (error) {
        handleApiError(error, "Failed to change password.");
        throw error;
      }
    },
    onSuccess: (response) =>{
      toast.success(response?.notification || "Password changed successfully")
    }
  });
};

export const useDeleteAccount = () => {
  const removeAuth = useAuthStore((state) => state.removeAuth);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        const response = await apiClient.delete("/profile/delete-account");
        return response.data
      } catch (error) {
        handleApiError(error, "Failed to delete account.");
        throw error;
      }
    },
    onSuccess: (response) => {
      removeAuth();
      queryClient.clear();
      window.location.reload();
      toast.success(response?.notification || "Account Deleted Successfully");
      navigate("/");
    },
  });
};
