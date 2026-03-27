import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ServiceDetails from './pages/ServiceDetails';
import Results from './pages/Results';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Settings from './pages/Settings';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/service/:serviceType" element={<ServiceDetails />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
