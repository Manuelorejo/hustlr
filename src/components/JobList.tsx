import { Job as JobType } from "../pages/search/search.api";
import JobCard from "./JobCard";

type JobListProps = {
  jobs: JobType[];
};

const JobList: React.FC<JobListProps> = ({ jobs }) => {

  return (
    <div className="text-left p-5 lg:p-10 mb-30">
      {jobs && jobs.length > 0 ? (
        <ul className="gap-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, index) => (
            <JobCard job={job} key={index} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No jobs found.</p>
      )}
    </div>
  );
};

export default JobList;
