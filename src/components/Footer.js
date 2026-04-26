import React from 'react';
import { FiMail, FiGithub, FiLinkedin, FiInstagram, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
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
              <li><a href="mailto:rachidkherbech@gmail.com" className="footer-link"><FiMail /> rachidkherbech@gmail.com</a></li>
              <li><a href="tel:+212771907202" className="footer-link"><FiPhone /> +212 771 907 202</a></li>
              <li><span className="footer-link"><FiMapPin /> Agadir, Morocco</span></li>
            </ul>
          </div>

          {/* Socials */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Connect</h4>
            <div className="footer-socials">
              <a href="https://linkedin.com/in/rachid-kherbech-1a2b3c" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="LinkedIn"><FiLinkedin /></a>
              <a href="https://github.com/yoorax" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="GitHub"><FiGithub /></a>
              <a href="https://wa.me/212771907202" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="WhatsApp"><FaWhatsapp /></a>
              <a href="https://instagram.com/yoorachid" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Instagram"><FiInstagram /></a>
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
