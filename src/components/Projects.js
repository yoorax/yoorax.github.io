import React, { useState, useEffect, useMemo } from 'react';
import { FiSearch, FiChevronDown, FiCpu, FiSettings, FiBarChart2, FiPenTool, FiExternalLink } from 'react-icons/fi';
import { getProjects, getTechIcon } from '../data/supabaseLoader';
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
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState(null);

  // Fetch projects from Supabase on mount
  useEffect(() => {
    getProjects().then(data => {
      setProjectsData(data);
      setLoading(false);
    });
  }, []);

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
  }, [searchQuery, projectsData]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

        {/* Loading Spinner */}
        {loading ? (
          <div className="projects-loading animate-in animate-in-delay-3">
            <div className="spinner"></div>
            <p>Loading projects...</p>
          </div>
        ) : (
          /* Category Cells */
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
                    {category.icon ? (
                      <img src={category.icon} alt={category.category} className="category-custom-icon" />
                    ) : (
                      categoryIcons[category.id]
                    )}
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

                {/* Cell Content — Thumbnail-Only Project Grid */}
                <div className="cell-content">
                  <div className="cell-divider"></div>
                  <div className="project-grid">
                    {category.projects.map(project => (
                      <div
                        className="project-box-minimal"
                        key={project.id}
                        id={`project-${project.id}`}
                        onClick={() => setActiveProject(project)}
                        role="button"
                        tabIndex={0}
                        title={`Click to view details for ${project.name}`}
                      >
                        {project.thumbnail ? (
                          <div className="project-thumbnail-wrapper-minimal">
                            <img src={project.thumbnail} alt={project.name} className="project-box-thumbnail-minimal" />
                            <div className="project-box-overlay">
                              <span className="project-box-overlay-title">{project.name}</span>
                              <span className="project-box-overlay-subtitle">Click to view details</span>
                            </div>
                          </div>
                        ) : (
                          <div className="project-thumbnail-wrapper-minimal placeholder">
                            <span className="project-placeholder-title">{project.name}</span>
                            <span className="project-placeholder-sub">Click to view details</span>
                          </div>
                        )}
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
        )}
      </div>

      {/* Project Detail Modal */}
      {activeProject && (
        <div
          className="project-modal-backdrop"
          onClick={() => setActiveProject(null)}
          id="modal-backdrop"
        >
          <div
            className="project-modal-content"
            onClick={(e) => e.stopPropagation()}
            id="modal-content"
          >
            {/* Close Button: Red circle with X inside */}
            <button
              className="project-modal-close"
              onClick={() => setActiveProject(null)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="project-modal-scrollable">
              {activeProject.thumbnail && (
                <div className="modal-banner-wrapper">
                  <img src={activeProject.thumbnail} alt={activeProject.name} className="modal-banner-image" />
                </div>
              )}

              <div className="modal-body">
                <span className="modal-category-badge">{activeProject.category}</span>
                <h2 className="modal-title">{activeProject.name}</h2>

                {activeProject.brief_description && (
                  <p className="modal-brief">{activeProject.brief_description}</p>
                )}

                <div className="modal-divider"></div>

                <div className="modal-description-section">
                  <h4 className="modal-section-heading">Detailed Description</h4>
                  <p className="modal-full-desc">{activeProject.description}</p>
                </div>

                <div className="modal-divider"></div>

                 <div className="modal-skills-wrapper">
                  {/* Subsection 1: Concepts */}
                  {activeProject.concepts && activeProject.concepts.length > 0 && (
                    <div className="modal-skills-group">
                      <h4 className="modal-section-heading">Learning Concepts</h4>
                      <div className="skill-tags">
                        {activeProject.concepts.map((concept, i) => (
                          <span key={i} className="skill-tag concept-tag">{concept}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Subsection 2: Softwares & Technologies */}
                  {activeProject.technologies && activeProject.technologies.length > 0 && (
                    <div className="modal-skills-group" style={{ marginTop: '1.5rem' }}>
                      <h4 className="modal-section-heading">Softwares &amp; Technologies</h4>
                      <div className="tech-skills-grid">
                        {activeProject.technologies.map((tech, i) => (
                          <div key={i} className="tech-item" title={tech}>
                            <div className="tech-icon">{getTechIcon(tech)}</div>
                            <span className="tech-name">{tech}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {activeProject.project_link && (
                  <div className="modal-link-section">
                    <a
                      href={activeProject.project_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary modal-link-btn"
                    >
                      {activeProject.link_name || 'Visit Project Link'} <FiExternalLink />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
