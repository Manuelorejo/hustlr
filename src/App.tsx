import ProtectedRoute from "./utils/ProtectedRoute";
import AuthRoute from "./utils/AuthRoute";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  Signup,
  Login,
  RequestPasswordReset,
  ResetPassword,
} from "./pages/auth/auth.index";
import { Home } from "./pages/main/index";
import { useGetProfile } from "./pages/profile/profile.api";
import LoadingScreen from "./components/LoadingScreen";
import { useEffect } from "react";
import { useAuthStore } from "./pages/auth/auth.store";
import { useProfileStore } from "./pages/profile/profile.store";
import { Bookmarks } from "./pages/bookmarks/bookmarks.index";
import { Profile } from "./pages/profile/profile.index";
import NotFound from "./components/NotFound";
import { Search } from "./pages/search/search.index";

const App: React.FC = () => {
  const { data: profile, isLoading, isSuccess, isError } = useGetProfile();
    const setProfile = useProfileStore((state) => state.setProfile);
    const removeAuth = useAuthStore((state) => state.removeAuth)

  useEffect(() => {
    if (isSuccess && profile) {
      setProfile(profile);
    }
  }, [isSuccess, profile, setProfile]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if(isError){
    removeAuth();
  }

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Authentication Routes (Accessible only if NOT logged in) */}
        <Route element={<AuthRoute />}>
          <Route path="/auth">
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="password-reset">
              <Route path="request" element={<RequestPasswordReset />} />
              <Route path="reset" element={<ResetPassword />} />
            </Route>
          </Route>
        </Route>

        {/* Public Routes (No authentication required) */}
        <Route path="/" element={<Home />} />
        <Route path = "/search" element={<Search/>}/>

        
        {/* Protected Routes (Requires authentication) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/bookmarks" element={<Bookmarks/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  );
};

export default App;
