import {Job as JobType} from "../pages/search/search.api"

type JobListProps = {
  jobs: JobType[];
};

const JobList:React.FC<JobListProps> = ({ jobs }) => {
  return (
    <div className="text-left p-5 lg:p-10">
      {jobs && jobs.length > 0 ? (
        <ul className="space-y-3">
          {jobs.map((job, index) => (
            <li key={index} className="border-b pb-3">
              <a
                href={job.job_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {job.job_title}
              </a>
              <p className="text-gray-500">{job.job_location} - {job.job_source}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No jobs found.</p>
      )}
    </div>
  );
};

export default JobList;
