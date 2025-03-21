import Navbar from "../components/Navbar";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";
import { useClearBookmarks } from "../pages/bookmarks/bookmarks.api";

interface Props {
  children: React.ReactNode;
  pageTitle?: string;
}

const MainLayout: React.FC<Props> = ({ children, pageTitle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: clearBookmarks, isPending } = useClearBookmarks();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <main className="relative">
      <Navbar />
      <div className="lg:pt-20 min-h-svh flex flex-col">
        {pageTitle && (
          <div className="flex justify-between items-center p-5 lg:p-10">
            <button
              className="text-lg lg:text-2xl flex items-center gap-2 cursor-pointer font-semibold"
              onClick={goBack}
            >
              <FaArrowLeftLong className="text-2xl" />
              {pageTitle}
            </button>

            {/* Show "Clear All" button only on /bookmarks */}
            {location.pathname === "/bookmarks" && (
              <button
                onClick={() => clearBookmarks()}
                disabled={isPending}
                className="text-lg font-semibold cursor-pointer text-primary"
              >
                {isPending ? "Clearing..." : "Clear All"}
              </button>
            )}
          </div>
        )}
        {children}
      </div>
    </main>
  );
};

export default MainLayout;
