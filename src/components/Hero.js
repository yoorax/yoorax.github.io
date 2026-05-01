import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiMail, FiGithub, FiLinkedin, FiEdit3 } from 'react-icons/fi';
import { HiOutlineLightningBolt, HiOutlineGlobeAlt, HiOutlineChip } from 'react-icons/hi';
import SkillMap from './SkillMap';
import './Hero.css';

function Hero() {
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
              <a href="mailto:rachidkherbech@gmail.com" className="btn btn-outline" id="cta-connect">
                Let's Connect <FiMail />
              </a>
            </div>

            {/* Social Row */}
            <div className="hero-socials">
              <a href="mailto:rachidkherbech@gmail.com" className="social-icon" aria-label="Email" title="Email">
                <FiMail />
              </a>
              <a href="https://linkedin.com/in/rachid-kherbech-1a2b3c" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn" title="LinkedIn">
                <FiLinkedin />
              </a>
              <a href="https://github.com/yoorax" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub" title="GitHub">
                <FiGithub />
              </a>
              <a href="https://medium.com/@rachidkherbech" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Medium" title="Medium">
                <FiEdit3 />
              </a>
            </div>
          </div>

          {/* Right: Photo */}
          <div className="hero-photo-wrapper animate-in animate-in-delay-2">
            <div className="hero-photo-glow"></div>
            <div className="hero-photo-frame">
              <img
                src="/portfolio_image.webp"
                alt="Rachid Kherbech — Professional portrait"
                className="hero-photo"
              />
            </div>
            {/* Floating badges */}
            <div className="hero-badge badge-top">
              <HiOutlineChip /> Industry 4.0
            </div>
            <div className="hero-badge badge-bottom">
              <HiOutlineLightningBolt /> OT / IT
            </div>
          </div>
        </div>
      </div>

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
