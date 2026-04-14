import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, AlertCircle, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.auth-card', {
        opacity: 0,
        scale: 0.92,
        y: 30,
        duration: 0.7,
        ease: 'power3.out',
      });
      gsap.from('.auth-back-btn', {
        opacity: 0,
        x: -20,
        duration: 0.5,
        delay: 0.3,
        ease: 'power2.out',
      });
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message);
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="auth-wrapper" ref={wrapperRef}>
      <div className="auth-bg-blob"></div>

      <button className="auth-back-btn" onClick={() => navigate('/')}>
        <ArrowLeft size={20} />
      </button>

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon-wrapper">
            <LogIn size={28} strokeWidth={1.6} />
          </div>
          <h1>Welcome Back</h1>
          <p>Log in to your ChurnPred account</p>
        </div>

        {error && (
          <div className="auth-error">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-input-group">
            <label>Email</label>
            <div className="auth-input-wrapper">
              <Mail size={18} className="auth-input-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="auth-input"
              />
            </div>
          </div>

          <div className="auth-input-group">
            <label>Password</label>
            <div className="auth-input-wrapper">
              <Lock size={18} className="auth-input-icon" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="auth-input"
              />
            </div>
          </div>

          <button
            type="submit"
            className={`auth-submit-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
