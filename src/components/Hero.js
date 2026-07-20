import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiMail, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { HiOutlineLightningBolt, HiOutlineGlobeAlt, HiOutlineChip } from 'react-icons/hi';
import SkillMap from './SkillMap';
import DashboardKPI from './DashboardKPI';
import { getContactSettings } from '../data/supabaseLoader';
import './Hero.css';

function Hero() {
  const [contacts, setContacts] = useState({
    email: 'rachidkherbech@gmail.com',
    phone: '+212 771 907 202',
    whatsapp: 'https://wa.me/212771907202',
    github: 'https://github.com/yoorax',
    linkedin: 'https://linkedin.com/in/rachid-kherbech-1a2b3c',
    instagram: 'https://instagram.com/yoorachid',
    reddit: 'https://reddit.com',
    medium: 'https://medium.com/@rachidkherbech',
    location: 'Agadir, Morocco'
  });

  useEffect(() => {
    getContactSettings().then(data => setContacts(data));
  }, []);

  return (
    <section className="hero-page" id="hero-section">
      {/* ---- Above the Fold ---- */}
      <div className="hero-above-fold">
        <div className="container hero-grid">
          {/* Left: Text Content */}
          <div className="hero-text animate-in">
            <p className="hero-greeting">Hi, I'm</p>
            <h1 className="hero-name">
              Rachid <span className="hero-name-accent">Kherbech</span>
            </h1>
            <h2 className="hero-title">
              Junior Industrial Automation &amp; Data Engineer
            </h2>
            <p className="hero-pitch">
              "Do you really think engineering is perfectionism? Well… it actually is.{' '}
              <span className="pitch-accent">Chaos aligned in perfect harmony.</span>"
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta">
              <Link to="/projects" className="btn btn-primary" id="cta-projects">
                View My Projects <FiArrowRight />
              </Link>
              <a href={`mailto:${contacts.email}`} className="btn btn-outline" id="cta-connect">
                Let's Connect <FiMail />
              </a>
            </div>

            {/* Social Row */}
            <div className="hero-socials">
              <a href={`mailto:${contacts.email}`} className="social-icon" aria-label="Email" title="Email">
                <FiMail />
              </a>
              {contacts.linkedin && (
                <a href={contacts.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn" title="LinkedIn">
                  <FiLinkedin />
                </a>
              )}
              {contacts.github && (
                <a href={contacts.github} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub" title="GitHub">
                  <FiGithub />
                </a>
              )}
              {contacts.whatsapp && (
                <a href={contacts.whatsapp} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp" title="WhatsApp">
                  <FaWhatsapp />
                </a>
              )}
              {contacts.instagram && (
                <a href={contacts.instagram} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram" title="Instagram">
                  <FiInstagram />
                </a>
              )}
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="hero-photo-wrapper animate-in animate-in-delay-2">
            <div className="hero-photo-glow"></div>
            <img
              src="/portfolio_image_illustration.webp"
              alt="Rachid Kherbech — Professional illustration"
              className="hero-illustration"
            />
            {/* Floating badges — untouched */}
            <div className="hero-badge badge-top">
              <HiOutlineChip /> Industry 4.0
            </div>
            <div className="hero-badge badge-bottom">
              <HiOutlineLightningBolt /> OT / IT
            </div>
          </div>
        </div>
      </div>

      {/* ---- Dashboard KPI Section ---- */}
      <DashboardKPI />

      {/* ---- Hybrid Skill Map ---- */}
      <SkillMap />

      {/* ---- Value Propositions ---- */}
      <div className="hero-value-section">
        <div className="container">
          <h3 className="value-heading animate-in">Why Work With Me?</h3>
          <div className="value-grid">
            <div className="value-card animate-in animate-in-delay-1">
              <div className="value-icon">
                <HiOutlineGlobeAlt />
              </div>
              <h4 className="value-title">OT / IT Convergence</h4>
              <p className="value-text">
                Bridging the gap between Operational Technology and Information Technology — from PLC programming and SCADA systems to SQL databases and Power BI dashboards.
              </p>
            </div>

            <div className="value-card animate-in animate-in-delay-2">
              <div className="value-icon">
                <HiOutlineLightningBolt />
              </div>
              <h4 className="value-title">Sustainable Automation</h4>
              <p className="value-text">
                Committed to leveraging robotics, AI, and Industry 4.0 technologies for environmental sustainability — from waste recycling machines to autonomous vertical farms.
              </p>
            </div>

            <div className="value-card animate-in animate-in-delay-3">
              <div className="value-icon">
                <HiOutlineChip />
              </div>
              <h4 className="value-title">Rapid Technical Adaptability</h4>
              <p className="value-text">
                Proven ability to rapidly learn and implement new industrial technologies — from CAD design and FEA simulation to machine learning and IIoT data pipelines.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Skills Marquee ---- */}
      <div className="hero-skills-strip">
        <div className="marquee">
          <div className="marquee-content">
            {['SolidWorks', 'CATIA V5', 'Python', 'TIA Portal', 'SQL Server', 'Power BI', 'MATLAB', 'Node-RED', 'OpenCV', 'YOLOv8', 'Fusion 360', 'Arduino', 'ROS 2', 'Excel VBA', 'Scikit-learn', 'Git', 'SolidWorks', 'CATIA V5', 'Python', 'TIA Portal', 'SQL Server', 'Power BI', 'MATLAB', 'Node-RED', 'OpenCV', 'YOLOv8', 'Fusion 360', 'Arduino', 'ROS 2', 'Excel VBA', 'Scikit-learn', 'Git'].map((skill, i) => (
              <span key={i} className="marquee-item">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
