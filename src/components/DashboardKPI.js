import React, { useState, useEffect } from 'react';
import { FiFolder, FiBriefcase, FiAward, FiStar } from 'react-icons/fi';
import { getProjects, getExperience, getEducation, getActivities } from '../data/supabaseLoader';
import './DashboardKPI.css';

function DashboardKPI() {
  const [stats, setStats] = useState({
    projectsCount: 0,
    experienceTime: 'Loading...',
    certificationsCount: 0,
    activitiesCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [projects, experiences, education, activities] = await Promise.all([
          getProjects(),
          getExperience(),
          getEducation(),
          getActivities()
        ]);

        // 1. Calculate Projects Count
        const projectsCount = projects.reduce((sum, cat) => sum + (cat.projects?.length || 0), 0);

        // 2. Calculate Total Experience Time
        const totalMonths = experiences.reduce((sum, exp) => sum + (exp.durationMonths || 0), 0);
        const years = Math.floor(totalMonths / 12);
        const remainingMonths = totalMonths % 12;
        let timeString = '';
        if (years > 0) {
          timeString += `${years} Year${years > 1 ? 's' : ''}`;
        }
        if (remainingMonths > 0) {
          if (timeString) timeString += ' ';
          timeString += `${remainingMonths} Month${remainingMonths > 1 ? 's' : ''}`;
        }
        if (!timeString) timeString = '0 Months';

        // 3. Calculate Certifications Count
        const certificationsCount = education.certificationData.reduce(
          (sum, cat) => sum + (cat.certs?.length || 0),
          0
        );

        // 4. Calculate Activities Count
        const activitiesCount = activities.length;

        setStats({
          projectsCount,
          experienceTime: timeString,
          certificationsCount,
          activitiesCount
        });
      } catch (err) {
        console.error('Error loading dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <section className="dashboard-section">
      <div className="container">
        <div className="dashboard-header animate-in">
          <h3 className="dashboard-title">Live Portfolio Dashboard</h3>
        </div>

        {loading ? (
          <div className="dashboard-loading">
            <div className="dashboard-spinner"></div>
          </div>
        ) : (
          <div className="dashboard-grid">
            {/* Card 1: Projects (Pink) */}
            <div className="kpi-card pink animate-in animate-in-delay-1">
              <div className="kpi-icon-wrapper">
                <FiFolder className="kpi-icon" />
              </div>
              <div className="kpi-content">
                <span className="kpi-value">{stats.projectsCount}</span>
                <span className="kpi-label">Projects Completed</span>
              </div>
            </div>

            {/* Card 2: Experience (Blue) */}
            <div className="kpi-card blue animate-in animate-in-delay-2">
              <div className="kpi-icon-wrapper">
                <FiBriefcase className="kpi-icon" />
              </div>
              <div className="kpi-content">
                <span className="kpi-value">{stats.experienceTime}</span>
                <span className="kpi-label">Practical Experience</span>
              </div>
            </div>

            {/* Card 3: Certifications (Green) */}
            <div className="kpi-card green animate-in animate-in-delay-3">
              <div className="kpi-icon-wrapper">
                <FiAward className="kpi-icon" />
              </div>
              <div className="kpi-content">
                <span className="kpi-value">{stats.certificationsCount}</span>
                <span className="kpi-label">Courses &amp; Certifications</span>
              </div>
            </div>

            {/* Card 4: Leadership/Activities (Purple) */}
            <div className="kpi-card purple animate-in animate-in-delay-4">
              <div className="kpi-icon-wrapper">
                <FiStar className="kpi-icon" />
              </div>
              <div className="kpi-content">
                <span className="kpi-value">{stats.activitiesCount}</span>
                <span className="kpi-label">Leadership &amp; Activities</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default DashboardKPI;
