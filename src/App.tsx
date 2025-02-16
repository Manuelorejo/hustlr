import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Signup, Login, ForgotPassword, VerifyToken, ResetPassword } from './features/auth';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/forgot-password/verify-token' element={<VerifyToken/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
      </Routes>
    </Router>
  );
};

export default App;
