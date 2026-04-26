import React, { useState, useMemo } from 'react';
import { FiSearch, FiChevronDown, FiCpu, FiSettings, FiBarChart2, FiPenTool, FiExternalLink } from 'react-icons/fi';
import projectsData from '../data/projects';
import './Projects.css';

const categoryIcons = {
  'robotics': <FiCpu />,
  'industrial-automation': <FiSettings />,
  'ai-data': <FiBarChart2 />,
  'mechanical-cad': <FiPenTool />,
};

function Projects() {
  const [openCell, setOpenCell] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleCell = (id) => {
    setOpenCell(prev => (prev === id ? null : id));
  };

  /* Filter projects by search query */
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return projectsData;

    const q = searchQuery.toLowerCase();
    return projectsData
      .map(cat => ({
        ...cat,
        projects: cat.projects.filter(
          p =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.tools.some(t => t.toLowerCase().includes(q))
        ),
      }))
      .filter(cat => cat.projects.length > 0);
  }, [searchQuery]);

  return (
    <section className="page projects-page" id="projects-section">
      <div className="container">
        <h1 className="section-title animate-in">Projects</h1>
        <p className="section-subtitle animate-in animate-in-delay-1">
          A structured showcase of technical work across multiple engineering domains.
        </p>

        {/* Search Bar */}
        <div className="projects-search animate-in animate-in-delay-2">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search projects by name, tool, or keyword..."
            className="search-input"
            id="project-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => setSearchQuery('')}>
              ✕
            </button>
          )}
        </div>

        {/* Category Cells */}
        <div className="projects-cells">
          {filteredData.map((category, idx) => (
            <div
              key={category.id}
              className={`cell project-cell ${openCell === category.id ? 'active' : ''}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Cell Header */}
              <div
                className="cell-header"
                onClick={() => toggleCell(category.id)}
                role="button"
                tabIndex={0}
                aria-expanded={openCell === category.id}
                id={`cell-${category.id}`}
              >
                <div className="cell-icon">
                  {categoryIcons[category.id]}
                </div>
                <div className="cell-info">
                  <div className="cell-title">{category.category}</div>
                  <div className="cell-meta">
                    <span>{category.description}</span>
                    <span className="cell-count">{category.projects.length} projects</span>
                  </div>
                </div>
                <FiChevronDown className="cell-chevron" />
              </div>

              {/* Cell Content — Project Boxes */}
              <div className="cell-content">
                <div className="cell-divider"></div>
                <div className="project-grid">
                  {category.projects.map(project => (
                    <div className="project-box" key={project.id} id={`project-${project.id}`}>
                      <div className="project-box-header">
                        <h4 className="project-box-name">{project.name}</h4>
                        <FiExternalLink className="project-box-link-icon" />
                      </div>
                      <p className="project-box-desc">{project.description}</p>
                      <div className="skill-tags project-tags">
                        {project.tools.map((tool, i) => (
                          <span key={i} className="skill-tag">{tool}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {filteredData.length === 0 && (
            <div className="projects-empty">
              <p>No projects match "<strong>{searchQuery}</strong>". Try a different keyword.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Projects;
