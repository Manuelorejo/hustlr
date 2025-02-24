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

const App: React.FC = () => {
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

        
        {/* Protected Routes (Requires authentication) */}
        <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
