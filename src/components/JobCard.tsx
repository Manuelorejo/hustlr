import { Job as JobType } from "../pages/search/search.api";
import { CiLocationOn } from "react-icons/ci";
import { PiSuitcaseSimpleThin } from "react-icons/pi";
import { CiBookmark } from "react-icons/ci";
import { LuArrowUpRight } from "react-icons/lu";
import { Link } from "react-router-dom";

interface Props {
  job: JobType
}

const JobCard: React.FC<Props> = ({ job }) => {
  return (
    <li className={`border rounded-lg flex flex-col justify-between overflow-hidden `}>
      <div className="px-3 py-3 flex flex-col gap-3">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis">
            <CiLocationOn className="text-xl" />
            <span>{job.job_location ? job.job_location : "Not Specified"}</span>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis">
            <PiSuitcaseSimpleThin className="text-xl" />
            <span>{job.job_mode ? job.job_mode : "Not Specified"}</span>
          </div>
        </div>
        {job.job_title && <h2 className="font-semibold">{job.job_title}</h2>}
        <p>
          <span className="font-medium">Source: </span>
          {job.job_source}
        </p>
      </div>
      <div className="border-t px-3 py-3 flex gap-5 bg-white justify-between">
        <button className="cursor-pointer" title="Bookmark">
          <CiBookmark className="text-2xl" />
        </button>
        <Link to={job.job_link ? job.job_link : ""} target="_blank" className="button-primary w-fit h-fit flex items-center gap-1 mt-0 py-1">
          View
          <LuArrowUpRight />
        </Link>
      </div>
    </li>
  );
};

export default JobCard;
