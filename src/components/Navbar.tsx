import { Link } from "react-router-dom";
import { CiLogout, CiHome, CiBookmark, CiUser, CiLogin } from "react-icons/ci";
import { useLogout } from "../pages/auth/auth.api";
import Logo from "./Logo";
import { useAuthStore } from "../pages/auth/auth.store";

const Topbar = () => {
  const logout = useLogout();
  const accessToken = useAuthStore((state) => state.accessToken)

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md hidden lg:flex gap-10 items-center py-4 px-10 z-50 h-20 justify-between">
      <Link to="/" className="flex items-center gap-4 text-lg rounded">
        <Logo />
      </Link>
      <div className="flex items-center gap-10">
      <Link to="/bookmarks" className="flex items-center gap-4 text-lg rounded">
        {/* <CiBookmark className="text-2xl" /> */}
        Bookmarks
      </Link>
      <Link to="/profile" className="flex items-center gap-4 text-lg rounded">
        {/* <CiUser className="text-2xl" /> */}
        My Account
      </Link>
      {accessToken? (
        <button
          className="button-primary w-auto mt-0 font-normal"
          title="Logout"
          onClick={() => logout.mutate()}
        >
          Logout
        </button>
      ) : (
        <div className="flex gap-5 items-center">
          <Link to="/auth/login" className=" font-medium text-primary">
            Login
          </Link>
          <Link
            to="/auth/signup"
            className="button-primary w-auto mt-0 font-normal"
          >
            Signup
          </Link>
        </div>
      )} 
      </div>
    </nav>
  );
};

const Bottombar = () => {
  const logout = useLogout();
  const accessToken = useAuthStore((state) => state.accessToken)

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-between items-center p-4 z-50 lg:hidden h-20">
      <Link
        to="/"
        className="flex flex-col items-center text-sm text-gray-700 hover:text-blue-500"
      >
        <CiHome className="text-2xl" />
        Home
      </Link>
      <Link
        to="/bookmarks"
        className="flex flex-col items-center text-sm text-gray-700 hover:text-blue-500"
      >
        <CiBookmark className="text-2xl" />
        Bookmark
      </Link>
      <Link
        to="/profile"
        className="flex flex-col items-center text-sm text-gray-700 hover:text-blue-500"
      >
        <CiUser className="text-2xl" />
        My Account
      </Link>
      {
        accessToken ? (
          <button
          className="flex flex-col items-center text-sm cursor-pointer"
          onClick={() => logout.mutate()}
        >
          <CiLogout className="text-2xl" />
          Logout
        </button>
        ) : (
          <Link
          to="/auth/login"
          className="flex flex-col items-center text-sm cursor-pointer"
          onClick={() => logout.mutate()}
        >
          <CiLogin className="text-2xl" />
          Login
        </Link>
        )
      }
    </nav>
  );
};

const Navbar = () => (
  <>
    <Topbar />
    <Bottombar />
  </>
);

export default Navbar;
