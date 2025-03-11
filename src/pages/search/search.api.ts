import { useQuery } from "@tanstack/react-query";
import apiClient from "../../api";
import { handleApiError } from "../../api";

export type Job = {
  job_title: string;
  job_location: string;
  job_link: string;
  job_mode: string | null;
  job_source: string;
};

export const useSearchJobs = (title: string, location: string) => {
  return useQuery<Job[], Error>({
    queryKey: ["jobs", title, location],
    queryFn: async () => {
      try {
        const response = await apiClient.get("/jobs", {
          params: { title, location },
        });
        return response.data?.data;
      } catch (error) {
        handleApiError(error, "Failed to fetch job listings.");
        throw error;
      }
    },
    enabled: !!title,
    staleTime: 60 * 60 * 1000,
  });
};
