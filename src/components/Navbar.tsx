import { Link } from "react-router-dom";
import { CiLogout, CiHome, CiBookmark, CiUser } from "react-icons/ci";

const Sidebar = () => (
  <div className="hidden lg:flex flex-col w-16 h-screen px-2 py-10 lg:items-center gap-8">
    {/* <Logo /> */}
    <nav className="flex flex-col gap-6">
      <Link to="/" className="flex items-center gap-4 text-lg rounded">
        <CiHome className="text-2xl" />
      </Link>
      <Link to="/bookmarks" className="flex items-center gap-4 text-lg rounded">
        <CiBookmark className="text-2xl" />
      </Link>
      <Link to="/profile" className="flex items-center gap-4 text-lg rounded">
        <CiUser className="text-2xl" />
      </Link>
    </nav>
    {/* <div className="mt-10 p-4 bg-white text-black rounded-xl shadow-md flex-1">
      <h3 className="text-xl font-semibold mb-2">Welcome to Hustlr</h3>
      <p className="text-sm mb-3">Hustlr is your go-to platform for finding the best job opportunities tailored for you. Start your journey now!</p>
      <Link to="/about" className="text-blue-500 hover:underline text-sm">Learn More</Link>
    </div> */}
    <button className="flex items-center gap-4 text-lg text-red-500 p-2 rounded mt-auto" title="Logout">
      <CiLogout className="text-2xl" />
    </button>
  </div>
);

const Bottombar = () => (
  <div className="fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around items-center py-4 z-50 lg:hidden border-t border-gray-300">
    <Link to="/" className="flex flex-col items-center text-sm text-gray-700 hover:text-blue-500">
      <CiHome className="text-2xl" /> Home
    </Link>
    <Link to="/bookmarks" className="flex flex-col items-center text-sm text-gray-700 hover:text-blue-500">
      <CiBookmark className="text-2xl" /> Bookmarks
    </Link>
    <Link to="/profile" className="flex flex-col items-center text-sm text-gray-700 hover:text-blue-500">
      <CiUser className="text-2xl" /> Profile
    </Link>
    <button className="flex flex-col items-center text-sm text-red-500 hover:text-red-700">
      <CiLogout className="text-2xl" /> Logout
    </button>
  </div>
);

const Navbar = () => (
  <>
    <Sidebar />
    <Bottombar />
  </>
);

export default Navbar;
