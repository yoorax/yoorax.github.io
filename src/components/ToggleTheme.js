import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import './ToggleTheme.css';

function ToggleTheme({ theme, toggleTheme }) {
  return (
    <button
      className="theme-toggle"
      id="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="toggle-track">
        <div className={`toggle-thumb ${theme === 'light' ? 'toggle-thumb-light' : ''}`}>
          {theme === 'dark' ? <FiMoon /> : <FiSun />}
        </div>
      </div>
    </button>
  );
}

export default ToggleTheme;
