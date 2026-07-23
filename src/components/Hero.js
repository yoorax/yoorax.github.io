import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiMail, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { HiOutlineLightningBolt, HiOutlineGlobeAlt, HiOutlineChip } from 'react-icons/hi';
import SkillMap from './SkillMap';
import DashboardKPI from './DashboardKPI';
import { getContactSettings, getMarqueeSkills } from '../data/supabaseLoader';
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
    location: 'Agadir, Morocco',
    resume_url: 'https://awcaqmdzyhrcnlytjcec.supabase.co/storage/v1/object/public/portfolio-assets/home_page/resumes/BI_and_Data_Analytics_Engineer.pdf'
  });
  const [marqueeSkills, setMarqueeSkills] = useState([]);

  useEffect(() => {
    getContactSettings().then(data => setContacts(data));
    getMarqueeSkills().then(data => setMarqueeSkills(data));
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
              <a 
                href={contacts.resume_url || 'https://awcaqmdzyhrcnlytjcec.supabase.co/storage/v1/object/public/portfolio-assets/home_page/resumes/BI_and_Data_Analytics_Engineer.pdf'}
                onClick={async (e) => {
                  e.preventDefault();
                  const resumeUrl = contacts.resume_url || 'https://awcaqmdzyhrcnlytjcec.supabase.co/storage/v1/object/public/portfolio-assets/home_page/resumes/BI_and_Data_Analytics_Engineer.pdf';
                  window.open(resumeUrl, '_blank');
                  try {
                    const response = await fetch(resumeUrl);
                    const blob = await response.blob();
                    const blobUrl = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = blobUrl;
                    link.setAttribute('download', 'BI_and_Data_Analytics_Engineer.pdf');
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    window.URL.revokeObjectURL(blobUrl);
                  } catch (err) {
                    console.error('Error triggering automatic download:', err);
                  }
                }}
                className="btn btn-primary" 
                id="cta-resume"
              >
                View My Resume <FiArrowRight />
              </a>
              <a href={`mailto:${contacts.email || 'rachidkherbech@gmail.com'}`} className="btn btn-outline" id="cta-connect">
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

      {/* ---- Crossed Marquee Section (Between Banner and Dashboard) ---- */}
      <div className="hero-divider-marquee-wrapper">
        {marqueeSkills.length > 0 && (
          <div className="hero-crossed-marquee">
            {/* Pink Strip: Names (Moving Right to Left / scroll-left) */}
            <div className="marquee-strip pink-strip">
              <div className="strip-track track-left">
                {[
                  ...marqueeSkills,
                  ...marqueeSkills,
                  ...marqueeSkills,
                  ...marqueeSkills,
                  ...marqueeSkills,
                  ...marqueeSkills
                ].map((skill, index) => (
                  <div key={`name-${index}`} className="marquee-item-name">
                    {skill.name.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>

            {/* Pistachio Strip: Logos (Moving Right to Left / scroll-left) */}
            <div className="marquee-strip pistachio-strip">
              <div className="strip-track track-left">
                {[
                  ...marqueeSkills,
                  ...marqueeSkills,
                  ...marqueeSkills,
                  ...marqueeSkills,
                  ...marqueeSkills,
                  ...marqueeSkills
                ].map((skill, index) => (
                  <div key={`logo-${index}`} className="marquee-item-logo">
                    {skill.logo ? (
                      <img src={skill.logo} alt={skill.name} className="marquee-logo-img" />
                    ) : (
                      <span className="marquee-logo-placeholder">{skill.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
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

    </section>
  );
}

export default Hero;
