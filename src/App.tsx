import ProtectedRoute from "./utils/ProtectedRoute"
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Signup, Login, ForgotPassword, VerifyToken, ResetPassword } from './pages/auth/auth.index';
import { Home } from "./pages/main/index"


const App: React.FC = () => {
  return (
    <>
    <ToastContainer/>
    <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password-reset/">
        <Route path='request' element={<ForgotPassword />} />
        <Route path='verify' element={<VerifyToken />} />
        <Route path='reset' element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedRoute/>}>
          <Route path="/" element={<Home/>}/>
        </Route>
      </Routes>
    </>
  );
};

export default App;
