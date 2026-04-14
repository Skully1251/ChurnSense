import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ServiceDetails from './pages/ServiceDetails';
import Results from './pages/Results';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Settings from './pages/Settings';
import './index.css';

function AppRoutes() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary, #0a0f1c)',
      }}>
        <div style={{
          width: 40,
          height: 40,
          border: '3px solid rgba(20, 184, 166, 0.2)',
          borderTopColor: '#14b8a6',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/service/:serviceType" element={<ServiceDetails />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

