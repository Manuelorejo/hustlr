import { Bookmark as BookmarkType } from "../bookmarks.types";
import { CiLocationOn } from "react-icons/ci";
import { PiSuitcaseSimpleThin } from "react-icons/pi";
import { LuArrowUpRight } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useRemoveBookmark } from "../bookmarks.api";
import { MdCancelPresentation } from "react-icons/md";
import { RiLoader4Fill } from "react-icons/ri";

interface Props {
  bookmark: BookmarkType
}

const BookmarkCard: React.FC<Props> = ({ bookmark }) => {
    const {mutate:removeBookmark, isPending} = useRemoveBookmark();
  return (
    <li className={`border rounded-lg flex flex-col justify-between overflow-hidden `}>
      <div className="px-3 py-3 flex flex-col gap-3">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis">
            <CiLocationOn className="text-xl" />
            <span>{bookmark.jobLocation ? bookmark.jobLocation : "Not Specified"}</span>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis">
            <PiSuitcaseSimpleThin className="text-xl" />
            <span>{bookmark.jobMode ? bookmark.jobMode : "Not Specified"}</span>
          </div>
        </div>
        {bookmark.jobTitle && <h2 className="font-semibold">{bookmark.jobTitle}</h2>}
        <p>
          <span className="font-medium">Source: </span>
          {bookmark.jobSource}
        </p>
      </div>
      <div className="border-t px-3 py-3 flex gap-5 bg-white justify-between">
        <button className="cursor-pointer" title="Bookmark" onClick={() => removeBookmark(bookmark._id)}>
            {isPending ? <RiLoader4Fill className="text-2xl animate-spin" /> :  <MdCancelPresentation className="text-2xl" />}
        </button>
        <Link to={bookmark.jobLink ? bookmark.jobLink : ""} target="_blank" className="button-primary w-fit h-fit flex items-center gap-1 mt-0 py-1">
          View
          <LuArrowUpRight />
        </Link>
      </div>
    </li>
  );
};

export default BookmarkCard;
