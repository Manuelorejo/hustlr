import { useState } from "react";
import Header from "../components/Header";
import JobList from "../../../components/JobList";
import { useSearchJobs } from "../search.api";
import MainLayout from "../../../components/MainLayout";

export function Home() {
  const [searchParams, setSearchParams] = useState({ jobTitle: "", location: "" });

  // Fetch jobs based on search parameters
  const { data: jobs, isLoading, error } = useSearchJobs(searchParams.jobTitle, searchParams.location);

  return (
    <MainLayout>
      <Header setSearchParams={setSearchParams} isLoading={isLoading} error={error} />
      {
        jobs && (
          <JobList jobs={jobs} />
        )
      }
    </MainLayout>
  );
}

export default Home;
