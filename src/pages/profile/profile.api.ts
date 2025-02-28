import { useQuery } from "@tanstack/react-query";
import { User } from "./profile.types";
import { useAuthStore } from "../auth/auth.store";
import { handleApiError } from "../../api";
import apiClient from "../../api";


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
      enabled : !!accessToken,
    });
  };