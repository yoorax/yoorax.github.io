import React, { useState } from 'react';
import { FiChevronDown, FiBook, FiAward, FiCode, FiMapPin, FiCalendar } from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import { academicData, bootcampData, certificationData } from '../data/education';
import './Education.css';

function Education() {
  const [openCell, setOpenCell] = useState(null);

  const toggleCell = (id) => {
    setOpenCell(prev => (prev === id ? null : id));
  };

  return (
    <section className="page education-page" id="education-section">
      <div className="container">
        <h1 className="section-title animate-in">Education</h1>
        <p className="section-subtitle animate-in animate-in-delay-1">
          Academic foundations, intensive training programs, and professional certifications.
        </p>

        {/* ---- Academic Education ---- */}
        <div className="edu-group animate-in animate-in-delay-2">
          <h3 className="edu-group-title">
            <HiOutlineAcademicCap className="edu-group-icon" />
            Academic Education
          </h3>

          <div className="edu-cells">
            {academicData.map((edu, idx) => (
              <div
                key={edu.id}
                className={`cell edu-cell ${openCell === edu.id ? 'active' : ''}`}
              >
                <div
                  className="cell-header"
                  onClick={() => toggleCell(edu.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={openCell === edu.id}
                  id={`edu-${edu.id}`}
                >
                  <div className="cell-icon">
                    <HiOutlineAcademicCap />
                  </div>
                  <div className="cell-info">
                    <div className="cell-title">{edu.level}</div>
                    <div className="cell-meta">
                      <span>{edu.speciality}</span>
                      <span><FiCalendar /> {edu.period}</span>
                    </div>
                  </div>
                  <FiChevronDown className="cell-chevron" />
                </div>

                <div className="cell-content">
                  <div className="cell-divider"></div>

                  {/* Institution Info */}
                  <div className="edu-institution">
                    {edu.school && (
                      <div className="edu-info-row">
                        <span className="edu-label">School / Faculty</span>
                        <span className="edu-value">{edu.school}</span>
                      </div>
                    )}
                    {edu.university && (
                      <div className="edu-info-row">
                        <span className="edu-label">University</span>
                        <span className="edu-value">{edu.university}</span>
                      </div>
                    )}
                    <div className="edu-info-row">
                      <span className="edu-label">Location</span>
                      <span className="edu-value"><FiMapPin /> {edu.location}</span>
                    </div>
                    <div className="edu-info-row">
                      <span className="edu-label">Period</span>
                      <span className="edu-value"><FiCalendar /> {edu.period}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="edu-description">
                    <h4 className="edu-section-heading">My Experience</h4>
                    <p>{edu.description}</p>
                  </div>

                  {/* Skills */}
                  <div className="edu-skills">
                    <h4 className="edu-section-heading">Skills Gained</h4>
                    <div className="skill-tags">
                      {edu.skills.map((skill, i) => (
                        <span key={i} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Bootcamp & Training ---- */}
        <div className="edu-group animate-in animate-in-delay-3">
          <h3 className="edu-group-title">
            <FiCode className="edu-group-icon" />
            Bootcamps & Training Programs
          </h3>

          <div className="edu-cells">
            {bootcampData.map(boot => (
              <div
                key={boot.id}
                className={`cell edu-cell ${openCell === boot.id ? 'active' : ''}`}
              >
                <div
                  className="cell-header"
                  onClick={() => toggleCell(boot.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={openCell === boot.id}
                  id={`edu-${boot.id}`}
                >
                  <div className="cell-icon">
                    <FiCode />
                  </div>
                  <div className="cell-info">
                    <div className="cell-title">{boot.title}</div>
                    <div className="cell-meta">
                      <span>{boot.operator}</span>
                      <span><FiCalendar /> {boot.period}</span>
                      <span>{boot.format}</span>
                    </div>
                  </div>
                  <FiChevronDown className="cell-chevron" />
                </div>

                <div className="cell-content">
                  <div className="cell-divider"></div>

                  <div className="edu-institution">
                    <div className="edu-info-row">
                      <span className="edu-label">Operator</span>
                      <span className="edu-value">{boot.operator}</span>
                    </div>
                    <div className="edu-info-row">
                      <span className="edu-label">Format</span>
                      <span className="edu-value">{boot.format}</span>
                    </div>
                    <div className="edu-info-row">
                      <span className="edu-label">Location</span>
                      <span className="edu-value"><FiMapPin /> {boot.location}</span>
                    </div>
                  </div>

                  <div className="edu-description">
                    <h4 className="edu-section-heading">My Experience</h4>
                    <p>{boot.description}</p>
                  </div>

                  <div className="edu-skills">
                    <h4 className="edu-section-heading">Skills Gained</h4>
                    <div className="skill-tags">
                      {boot.skills.map((skill, i) => (
                        <span key={i} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Certifications ---- */}
        <div className="edu-group animate-in animate-in-delay-4">
          <h3 className="edu-group-title">
            <FiAward className="edu-group-icon" />
            Online Certifications
          </h3>

          <div className="cert-grid">
            {certificationData.map(cert => (
              <div className="cert-card" key={cert.id} id={`cert-${cert.id}`}>
                <div className="cert-header">
                  <FiAward className="cert-icon" />
                  <div>
                    <h4 className="cert-title">{cert.title}</h4>
                    <span className="cert-provider">{cert.provider}</span>
                  </div>
                </div>
                <div className="skill-tags cert-skills">
                  {cert.skills.map((skill, i) => (
                    <span key={i} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
