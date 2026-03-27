import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Upload, FileText, X, CheckCircle2, Lightbulb, ArrowLeft, TrendingDown, Users, BarChart3, Shield, Target } from 'lucide-react';
import gsap from 'gsap';
import './ServiceDetails.css';

/* ---- Static data: anti-churn tips per industry ---- */
const industryData = {
  telecom: {
    label: 'Telecommunications',
    tips: [
      { icon: TrendingDown, title: 'Monitor Usage Drops', text: 'Track subscribers whose call/data usage declines over consecutive billing cycles — a leading churn indicator.' },
      { icon: Users, title: 'Loyalty Incentives', text: 'Offer tiered loyalty rewards such as data boosts or discounts for long-tenure customers.' },
      { icon: BarChart3, title: 'NPS & Feedback Loops', text: 'Run periodic NPS surveys post-interaction and route detractors to a proactive retention team.' },
      { icon: Shield, title: 'Contract Flexibility', text: 'Provide no-lock-in or flexible plans to reduce dissatisfaction from rigid agreements.' },
      { icon: Target, title: 'Personalised Offers', text: 'Use machine learning to generate tailored bundle offers just before contract renewal windows.' },
    ],
  },
  saas: {
    label: 'SaaS / Software',
    tips: [
      { icon: TrendingDown, title: 'Track Feature Adoption', text: 'Identify accounts that haven\'t adopted key features within their first 90 days — they\'re at elevated risk.' },
      { icon: Users, title: 'Customer Success Check-ins', text: 'Schedule quarterly business reviews for mid-market accounts to realign value delivery.' },
      { icon: BarChart3, title: 'Health Scoring', text: 'Build a composite health score combining login frequency, support tickets, and NPS to flag at-risk accounts early.' },
      { icon: Shield, title: 'Frictionless Onboarding', text: 'An intuitive onboarding flow with milestones reduces time-to-value and early churn.' },
      { icon: Target, title: 'Expansion Revenue', text: 'Up-sell and cross-sell relevant add-ons to deepen product stickiness and increase switching cost.' },
    ],
  },
  retail: {
    label: 'Retail & E-commerce',
    tips: [
      { icon: TrendingDown, title: 'Recency-Frequency Analysis', text: 'Use RFM segmentation to target customers whose purchase frequency is declining before they fully lapse.' },
      { icon: Users, title: 'Win-back Campaigns', text: 'Trigger personalised email/SMS campaigns for customers inactive for 60+ days with exclusive offers.' },
      { icon: BarChart3, title: 'Basket Analysis', text: 'Monitor average order value trends — shrinking baskets often precede complete churn.' },
      { icon: Shield, title: 'Seamless Returns', text: 'A hassle-free return policy builds trust and dramatically reduces post-purchase churn.' },
      { icon: Target, title: 'Loyalty Programmes', text: 'Points-based loyalty systems with tangible rewards increase repeat purchase rates by up to 30 %.' },
    ],
  },
  finance: {
    label: 'Banking & Finance',
    tips: [
      { icon: TrendingDown, title: 'Dormancy Detection', text: 'Flag accounts with zero transactions for 30+ days and trigger a proactive outreach workflow.' },
      { icon: Users, title: 'Relationship Managers', text: 'Assign dedicated relationship managers to high-value accounts to boost retention through personal contact.' },
      { icon: BarChart3, title: 'Product Utilisation', text: 'Customers using only one product have 4× higher churn — promote cross-product adoption.' },
      { icon: Shield, title: 'Fee Transparency', text: 'Clearly communicate all fees upfront; surprise charges are the #1 driver of banking churn.' },
      { icon: Target, title: 'Life-stage Offers', text: 'Predict life events (marriage, home purchase) from data signals and offer relevant financial products proactively.' },
    ],
  },
  healthcare: {
    label: 'Healthcare',
    tips: [
      { icon: TrendingDown, title: 'Appointment No-shows', text: 'Repeated no-shows correlate with disengagement — automate reminders and follow-up outreach.' },
      { icon: Users, title: 'Patient Portals', text: 'An easy-to-use digital portal increases engagement by 40 % and reduces plan-switch rates.' },
      { icon: BarChart3, title: 'Satisfaction Surveys', text: 'Collect post-visit CSAT scores and escalate negative feedback to the care coordination team within 24 h.' },
      { icon: Shield, title: 'Preventive Care Plans', text: 'Proactive wellness programmes demonstrate value and strengthen long-term patient loyalty.' },
      { icon: Target, title: 'Personalised Reminders', text: 'Send tailored health tips and screening reminders based on patient demographics and history.' },
    ],
  },
};

function ServiceDetails() {
  const { serviceType } = useParams();
  const navigate = useNavigate();
  const industry = industryData[serviceType] || industryData.telecom;
  const wrapperRef = useRef(null);

  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const fileInputRef = useRef(null);

  /* ---- Page entrance animation ---- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.info-panel', {
        opacity: 0,
        x: -60,
        duration: 0.8,
        ease: 'power3.out',
      });
      gsap.from('.upload-panel', {
        opacity: 0,
        x: 60,
        duration: 0.8,
        ease: 'power3.out',
        // delay: 0.12,
      });
      gsap.from('.details-back-btn', {
        opacity: 0,
        x: -20,
        duration: 0.5,
        delay: 0.3,
        ease: 'power2.out',
      });
      gsap.from('.tip-item', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        delay: 0.4,
        ease: 'power2.out',
      });
    }, wrapperRef);
    return () => ctx.revert();
  }, [serviceType]);

  /* ---- Drag & Drop handlers ---- */
  const onDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };
  const handleFileChange = (e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); };

  const handleFile = (uploadedFile) => {
    if (uploadedFile.type === 'text/csv' || uploadedFile.type === 'application/json' || uploadedFile.name.endsWith('.csv') || uploadedFile.name.endsWith('.json')) {
      setFile(uploadedFile);
    } else {
      alert('Please upload a valid CSV or JSON file.');
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /* ---- Predict ---- */
  const handlePredict = () => {
    if (!file) { alert('Please upload your data file before predicting.'); return; }
    setIsPredicting(true);

    setTimeout(() => {
      const mockResults = {
        totalCustomers: 12500,
        highRisk: 840,
        mediumRisk: 2100,
        lowRisk: 9560,
        overallChurnRate: '6.7%',
        serviceType,
        serviceLabel: industry.label,
      };
      navigate('/results', { state: { results: mockResults } });
    }, 2000);
  };

  return (
    <div className="details-wrapper" ref={wrapperRef}>
      {/* Back button */}
      <button className="details-back-btn" onClick={() => navigate('/dashboard')}>
        <ArrowLeft size={18} />
        <span>Back to Dashboard</span>
      </button>

      <div className="split-layout">
        {/* ---- LEFT: Anti-churn Tips ---- */}
        <div className="info-panel panel">
          <div className="info-panel-header">
            <Lightbulb size={24} strokeWidth={1.8} />
            <h2>{industry.label}</h2>
          </div>
          <p className="info-subtitle">Anti-Churn Best Practices</p>

          <ul className="tips-list">
            {industry.tips.map((tip, i) => {
              const TipIcon = tip.icon;
              return (
                <li key={i} className="tip-item">
                  <div className="tip-icon-wrapper">
                    <TipIcon size={20} strokeWidth={1.6} />
                  </div>
                  <div className="tip-text">
                    <strong>{tip.title}</strong>
                    <span>{tip.text}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ---- RIGHT: Upload + Predict ---- */}
        <div className="upload-panel panel">
          <div className="upload-panel-header">
            <h2>Upload Dataset</h2>
            <p>Upload your customer data in CSV or JSON format. Our AI model will analyse it and generate churn predictions.</p>
          </div>

          <div className="upload-section">
            {!file ? (
              <div
                className={`drop-zone ${isDragging ? 'drag-active' : ''}`}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={() => fileInputRef.current.click()}
              >
                <Upload size={40} className="upload-icon" />
                <p>Drag & Drop your file here or <span>Click to browse</span></p>
                <span className="upload-hint">Accepted formats: .csv, .json</span>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".csv, .json, text/csv, application/json"
                  style={{ display: 'none' }}
                />
              </div>
            ) : (
              <div className="file-preview panel">
                <FileText size={30} className="file-icon" />
                <div className="file-info">
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">{(file.size / 1024).toFixed(2)} KB</span>
                </div>
                <button type="button" onClick={removeFile} className="remove-file-btn">
                  <X size={20} />
                </button>
              </div>
            )}
          </div>

          <button
            className={`predict-btn ${isPredicting ? 'loading' : ''}`}
            disabled={isPredicting || !file}
            onClick={handlePredict}
          >
            {isPredicting ? (
              <span className="loading-text">Analyzing Models...</span>
            ) : (
              <>
                <span>Run Prediction</span>
                <CheckCircle2 size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;
