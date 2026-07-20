import React, { useState, useEffect } from 'react';
import { FiUsers, FiCalendar } from 'react-icons/fi';
import { HiOutlineLightningBolt } from 'react-icons/hi';
import { getActivities } from '../data/supabaseLoader';
import './Blog.css';

function Blog() {
  const [activitiesData, setActivitiesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActivities().then(data => {
      setActivitiesData(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="page blog-page" id="blog-section">
      <div className="container">
        <h1 className="section-title animate-in">Blog &amp; Activities</h1>
        <p className="section-subtitle animate-in animate-in-delay-1">
          Insights, leadership roles, and continuous learning beyond the classroom and the office.
        </p>

        {loading ? (
          <div className="projects-loading animate-in animate-in-delay-2">
            <div className="spinner"></div>
            <p>Loading activities feed...</p>
          </div>
        ) : (
          <div className="activity-feed">
            {activitiesData.map((activity, idx) => (
              <article className="activity-cell animate-in" key={activity.id} id={`activity-${activity.id}`} style={{ animationDelay: `${idx * 0.15}s` }}>
                <div className="activity-header">
                  <div className="activity-avatar"><HiOutlineLightningBolt /></div>
                  <div className="activity-header-info">
                    <h3 className="activity-title">{activity.title}</h3>
                    <span className="activity-subtitle">{activity.subtitle}</span>
                  </div>
                </div>
                <div className="activity-meta-bar">
                  <span className="activity-meta-item"><FiUsers /> {activity.organization}</span>
                  <span className="activity-meta-item"><FiCalendar /> {activity.period}</span>
                </div>
                <div className="activity-narrative"><p>{activity.description}</p></div>
                <div className="activity-highlights">
                  <h4 className="activity-highlights-title">Key Highlights</h4>
                  <ul className="activity-highlights-list">
                    {activity.highlights && activity.highlights.map((item, i) => (
                      <li key={i} className="activity-highlight-item"><span className="highlight-bullet"></span>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="activity-tags">
                  <div className="skill-tags">
                    {activity.tags && activity.tags.map((tag, i) => (<span key={i} className="skill-tag">{tag}</span>))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Blog;

