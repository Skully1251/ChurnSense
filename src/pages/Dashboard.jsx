import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Monitor, ShoppingCart, Landmark, HeartPulse, ChevronRight, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import './Dashboard.css';

const services = [
  {
    id: 'telecom',
    name: 'Telecommunications',
    description: 'Predict subscriber churn for mobile, broadband, and cable providers using call data records and usage patterns.',
    icon: Phone,
  },
  {
    id: 'saas',
    name: 'SaaS / Software',
    description: 'Identify at-risk accounts by analyzing product usage, feature adoption, and engagement metrics.',
    icon: Monitor,
  },
  {
    id: 'retail',
    name: 'Retail & E-commerce',
    description: 'Detect declining purchase frequency and basket-size trends to prevent customer attrition.',
    icon: ShoppingCart,
  },
  {
    id: 'finance',
    name: 'Banking & Finance',
    description: 'Spot early signs of account closure or dormancy using transaction behavior and service interactions.',
    icon: Landmark,
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Forecast patient disengagement and plan-switch risks by modeling visit cadence and satisfaction scores.',
    icon: HeartPulse,
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.dashboard-back-btn', {
        opacity: 0,
        x: -20,
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.from('.dashboard-header', {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: 'power3.out',
      });
      gsap.from('.service-card', {
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.25,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };

  return (
    <div className="dashboard-container" ref={containerRef}>
      <button className="dashboard-back-btn" onClick={() => navigate('/')}>
        <ArrowLeft size={20} />
      </button>

      <div className="dashboard-header">
        <h1>Choose Your <span className="text-accent">Industry</span></h1>
        <p>Select the service type that matches your business to get tailored churn predictions.</p>
      </div>

      <div className="services-grid container">
        {services.map((service) => {
          const IconComp = service.icon;
          return (
            <button
              key={service.id}
              className="service-card panel group"
              onClick={() => handleCardClick(service.id)}
            >
              <div className="service-icon-wrapper">
                <IconComp size={36} strokeWidth={1.6} />
              </div>
              <h2>{service.name}</h2>
              <p>{service.description}</p>
              <div className="service-card-footer">
                <span>Start Analysis</span>
                <ChevronRight className="arrow-icon" size={18} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
