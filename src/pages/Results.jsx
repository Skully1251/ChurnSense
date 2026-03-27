import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Users, AlertTriangle, ShieldCheck, Activity, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import './Results.css';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results;
  const containerRef = useRef(null);

  useEffect(() => {
    if (!results) return;
    const ctx = gsap.context(() => {
      gsap.from('.results-header', {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: 'power3.out',
      });
      gsap.from('.stat-card', {
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.12,
        delay: 0.2,
        ease: 'power3.out',
      });
      gsap.from('.action-bar', {
        opacity: 0,
        y: 30,
        duration: 0.5,
        delay: 0.6,
        ease: 'power2.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, [results]);

  if (!results) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="results-container" ref={containerRef}>
      <div className="results-header container">
        <h1 className="text-accent">Prediction Results</h1>
        <p>Analysis complete for <strong>{results.serviceLabel}</strong> industry</p>
      </div>

      <div className="stats-grid container">
        <div className="stat-card panel">
          <div className="stat-icon-wrapper">
            <Users size={32} />
          </div>
          <div className="stat-info">
            <h3>Total Analyzed</h3>
            <p className="stat-number">{results.totalCustomers.toLocaleString()}</p>
          </div>
        </div>

        <div className="stat-card panel">
          <div className="stat-icon-wrapper">
            <AlertTriangle size={32} />
          </div>
          <div className="stat-info">
            <h3>High Risk Churn</h3>
            <p className="stat-number">{results.highRisk.toLocaleString()}</p>
          </div>
        </div>

        <div className="stat-card panel">
          <div className="stat-icon-wrapper">
            <ShieldCheck size={32} />
          </div>
          <div className="stat-info">
            <h3>Low Risk / Safe</h3>
            <p className="stat-number">{results.lowRisk.toLocaleString()}</p>
          </div>
        </div>

        <div className="stat-card panel">
          <div className="stat-icon-wrapper">
            <Activity size={32} />
          </div>
          <div className="stat-info">
            <h3>Overall Churn Rate</h3>
            <p className="stat-number">{results.overallChurnRate}</p>
          </div>
        </div>
      </div>

      <div className="action-bar container panel">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={20} />
          <span>New Prediction</span>
        </button>
        <button className="export-btn">
          Export Report
        </button>
      </div>
    </div>
  );
}

export default Results;
