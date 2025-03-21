import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { handleApiError } from "../../api";
import apiClient from "../../api";
import { toast } from "react-toastify";

export const useGetBookmarks = () => {
  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      try {
        const response = await apiClient.get("/bookmarks/list");
        return response.data?.data;
      } catch (error) {
        handleApiError(error, "Failed to fetch bookmarks.");
        throw error;
      }
    },
  });
};



export type AddBookmarkInput = {
    job_title: string | null;
    job_location: string | null;
    job_link: string | null;
    job_mode: string | null;
    job_source: string | null;
  };
  
  export const useAddToBookmarks = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (bookmarkData: AddBookmarkInput) => {
        const response = await apiClient.post("/bookmarks/add", bookmarkData);
        return response.data;
      },
      onSuccess: () => {
        toast.success("Bookmark added successfully!");
        queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      },
      onError: (error) => {
        handleApiError(error, "Failed to add bookmark.");
      },
    });
  };






  export const useRemoveBookmark = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (bookmarkId: string) => {
        const response = await apiClient.delete(`/bookmarks/remove/${bookmarkId}`);
        return response.data;
      },
      onSuccess: () => {
        toast.success("Bookmark removed successfully!");
        queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      },
      onError: (error) => {
        handleApiError(error, "Failed to remove bookmark.");
      },
    });
  };



  export const useClearBookmarks = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async () => {
        const response = await apiClient.delete(`/bookmarks/clear`);
        return response.data;
      },
      onSuccess: () => {
        toast.success("All bookmarks cleared successfully!");
        queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      },
      onError: (error) => {
        handleApiError(error, "Failed to clear bookmarks.");
      },
    });
  };
