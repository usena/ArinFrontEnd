import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import VerifyOTP from './pages/VerifyOTP';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/sign-up' element={<SignUp />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/auth/verify-otp' element={<VerifyOTP />}/>
      </Routes>
    </Router>
  )
}

export default App
