import React, { useState } from 'react';
import { FiChevronDown, FiMapPin, FiCalendar, FiBriefcase, FiMonitor } from 'react-icons/fi';
import experienceData from '../data/experience';
import './Experience.css';

function Experience() {
  const [openCell, setOpenCell] = useState(null);

  const toggleCell = (id) => {
    setOpenCell(prev => (prev === id ? null : id));
  };

  return (
    <section className="page experience-page" id="experience-section">
      <div className="container">
        <h1 className="section-title animate-in">Experience</h1>
        <p className="section-subtitle animate-in animate-in-delay-1">
          My professional journey through industrial automation, mechanical design, and data engineering.
        </p>

        <div className="experience-cells">
          {experienceData.map((exp, idx) => (
            <div
              key={exp.id}
              className={`cell experience-cell ${openCell === exp.id ? 'active' : ''}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Cell Header */}
              <div
                className="cell-header"
                onClick={() => toggleCell(exp.id)}
                role="button"
                tabIndex={0}
                aria-expanded={openCell === exp.id}
                id={`exp-${exp.id}`}
              >
                <div className="cell-icon exp-logo">
                  <span>{exp.companyShort}</span>
                </div>
                <div className="cell-info">
                  <div className="cell-title">{exp.title}</div>
                  <div className="cell-meta">
                    <span><FiBriefcase /> {exp.company}</span>
                    <span><FiCalendar /> {exp.startDate} – {exp.endDate}</span>
                    <span><FiMapPin /> {exp.location}</span>
                    <span><FiMonitor /> {exp.type}</span>
                  </div>
                </div>
                <div className="exp-type-badge">{exp.jobType}</div>
                <FiChevronDown className="cell-chevron" />
              </div>

              {/* Cell Content */}
              <div className="cell-content">
                <div className="cell-divider"></div>

                {/* Duration Bar */}
                <div className="exp-duration-bar">
                  <span className="exp-duration-label">{exp.duration}</span>
                  <span className="exp-duration-type">{exp.type} · {exp.jobType}</span>
                </div>

                {/* Narrative Description */}
                <div className="exp-narrative">
                  <h4 className="exp-section-heading">About This Role</h4>
                  <p className="exp-description">{exp.description}</p>
                </div>

                {/* Responsibilities */}
                <div className="exp-responsibilities">
                  <h4 className="exp-section-heading">Key Responsibilities</h4>
                  <ul className="exp-list">
                    {exp.responsibilities.map((item, i) => (
                      <li key={i} className="exp-list-item">
                        <span className="exp-bullet"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div className="exp-skills">
                  <h4 className="exp-section-heading">Tools & Technologies</h4>
                  <div className="skill-tags">
                    {exp.skills.map((skill, i) => (
                      <span key={i} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
