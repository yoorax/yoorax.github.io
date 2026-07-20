import React, { useState, useEffect } from 'react';
import { FiChevronDown, FiBook, FiAward, FiCode, FiMapPin, FiCalendar, FiExternalLink } from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import { getEducation, getTechIcon } from '../data/supabaseLoader';
import './Education.css';

function Education() {
  const [openCell, setOpenCell] = useState(null);
  const [education, setEducation] = useState({ academicData: [], bootcampData: [], certificationData: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEducation().then(data => {
      setEducation(data);
      setLoading(false);
    });
  }, []);

  const toggleCell = (id) => {
    setOpenCell(prev => (prev === id ? null : id));
  };

  const { academicData, bootcampData, certificationData } = education;

  return (
    <section className="page education-page" id="education-section">
      <div className="container">
        <h1 className="section-title animate-in">Education</h1>
        <p className="section-subtitle animate-in animate-in-delay-1">
          Academic foundations, intensive training programs, and professional certifications.
        </p>

        {loading ? (
          <div className="projects-loading animate-in animate-in-delay-2">
            <div className="spinner"></div>
            <p>Loading education details...</p>
          </div>
        ) : (
          <>
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

                      <div className="edu-skills-wrapper">
                        {/* Subsection 1: Concepts */}
                        {edu.concepts && edu.concepts.length > 0 && (
                          <div className="edu-skills-group" style={{ marginBottom: '1.5rem' }}>
                            <h4 className="edu-section-heading">Learning Concepts</h4>
                            <div className="skill-tags">
                              {edu.concepts.map((concept, i) => (
                                <span key={i} className="skill-tag concept-tag">{concept}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Subsection 2: Softwares & Technologies */}
                        {edu.technologies && edu.technologies.length > 0 && (
                          <div className="edu-skills-group">
                            <h4 className="edu-section-heading">Softwares &amp; Technologies</h4>
                            <div className="tech-skills-grid">
                              {edu.technologies.map((tech, i) => (
                                <div key={i} className="tech-item" title={tech.name}>
                                  <div className="tech-icon">
                                    {tech.icon ? (
                                      <img src={tech.icon} alt={tech.name} className="tech-custom-icon" />
                                    ) : (
                                      getTechIcon(tech.name)
                                    )}
                                  </div>
                                  <span className="tech-name">{tech.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
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

                      <div className="edu-skills-wrapper">
                        {/* Subsection 1: Concepts */}
                        {boot.concepts && boot.concepts.length > 0 && (
                          <div className="edu-skills-group" style={{ marginBottom: '1.5rem' }}>
                            <h4 className="edu-section-heading">Learning Concepts</h4>
                            <div className="skill-tags">
                              {boot.concepts.map((concept, i) => (
                                <span key={i} className="skill-tag concept-tag">{concept}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Subsection 2: Softwares & Technologies */}
                        {boot.technologies && boot.technologies.length > 0 && (
                          <div className="edu-skills-group">
                            <h4 className="edu-section-heading">Softwares &amp; Technologies</h4>
                            <div className="tech-skills-grid">
                              {boot.technologies.map((tech, i) => (
                                <div key={i} className="tech-item" title={tech.name}>
                                  <div className="tech-icon">
                                    {tech.icon ? (
                                      <img src={tech.icon} alt={tech.name} className="tech-custom-icon" />
                                    ) : (
                                      getTechIcon(tech.name)
                                    )}
                                  </div>
                                  <span className="tech-name">{tech.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ---- Certifications Grouped by Categories ---- */}
            <div className="edu-group animate-in animate-in-delay-4">
              <h3 className="edu-group-title">
                <FiAward className="edu-group-icon" />
                Online Certifications
              </h3>

              <div className="cert-categories-wrapper">
                {certificationData.map((cat, catIdx) => (
                  <div key={cat.id} className="cert-category-group" style={{ animationDelay: `${catIdx * 0.1}s` }}>
                    <div className="cert-category-header">
                      <h4 className="cert-category-title">{cat.category}</h4>
                      {cat.description && <p className="cert-category-desc">{cat.description}</p>}
                    </div>

                    <div className="cert-grid">
                      {cat.certs.map(cert => (
                        <div className="cert-card" key={cert.id} id={`cert-${cert.id}`}>
                          {cert.certificateLink ? (
                            <a
                              href={cert.certificateLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="cert-card-link-wrapper"
                            >
                              <div className="cert-header linkable">
                                <FiAward className="cert-icon" />
                                <div>
                                  <h4 className="cert-title">
                                    {cert.title} <FiExternalLink className="cert-external-icon" />
                                  </h4>
                                  <span className="cert-provider">{cert.provider}</span>
                                </div>
                              </div>
                            </a>
                          ) : (
                            <div className="cert-header">
                              <FiAward className="cert-icon" />
                              <div>
                                <h4 className="cert-title">{cert.title}</h4>
                                <span className="cert-provider">{cert.provider}</span>
                              </div>
                            </div>
                          )}
                          <div className="skill-tags cert-skills">
                            {cert.skills && cert.skills.map((skill, i) => (
                              <span key={i} className="skill-tag">{skill}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Education;
