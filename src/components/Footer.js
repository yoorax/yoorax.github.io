import React, { useState, useEffect } from 'react';
import { FiMail, FiGithub, FiLinkedin, FiInstagram, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getContactSettings } from '../data/supabaseLoader';
import './Footer.css';

function Footer() {
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
    <footer className="footer" id="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-accent">R</span>achid<span className="logo-dot">.</span>
            </Link>
            <p className="footer-bio">
              Junior Industrial Automation &amp; Data Engineer. Passionate about Industry 4.0, robotics, and sustainable innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-link-list">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/projects" className="footer-link">Projects</Link></li>
              <li><Link to="/experience" className="footer-link">Experience</Link></li>
              <li><Link to="/education" className="footer-link">Education</Link></li>
              <li><Link to="/blog" className="footer-link">Blog &amp; Activities</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-link-list">
              <li>
                <a href={`mailto:${contacts.email}`} className="footer-link">
                  <FiMail /> {contacts.email}
                </a>
              </li>
              {contacts.phone && (
                <li>
                  <a href={`tel:${contacts.phone.replace(/\s+/g, '')}`} className="footer-link">
                    <FiPhone /> {contacts.phone}
                  </a>
                </li>
              )}
              {contacts.location && (
                <li>
                  <span className="footer-link">
                    <FiMapPin /> {contacts.location}
                  </span>
                </li>
              )}
            </ul>
          </div>

          {/* Socials */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Connect</h4>
            <div className="footer-socials">
              {contacts.linkedin && (
                <a href={contacts.linkedin} target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="LinkedIn">
                  <FiLinkedin />
                </a>
              )}
              {contacts.github && (
                <a href={contacts.github} target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="GitHub">
                  <FiGithub />
                </a>
              )}
              {contacts.whatsapp && (
                <a href={contacts.whatsapp} target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="WhatsApp">
                  <FaWhatsapp />
                </a>
              )}
              {contacts.instagram && (
                <a href={contacts.instagram} target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Instagram">
                  <FiInstagram />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Rachid Kherbech. All rights reserved.</p>
          <p className="footer-tagline">Built with <span className="accent-text">passion</span> and <span className="accent-text">React</span></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
