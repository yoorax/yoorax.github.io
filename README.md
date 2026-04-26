# Rachid Kherbech — Portfolio Website

A professional portfolio website built with React, showcasing projects in industrial automation, robotics, AI, and mechanical design.

## Tech Stack

- **React 18** with functional components and hooks
- **React Router** for page navigation
- **React Icons** for consistent iconography
- **CSS Custom Properties** for dark/light theming
- **Google Fonts** (Inter)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── App.js                 # Router + theme provider
├── index.js               # Entry point
├── components/
│   ├── Navbar.js/css      # Persistent navigation bar
│   ├── Hero.js/css        # Home page with photo and CTAs
│   ├── Projects.js/css    # Searchable project categories
│   ├── Experience.js/css  # Professional experience timeline
│   ├── Education.js/css   # Academic + certifications
│   ├── Blog.js/css        # Activities feed
│   ├── Footer.js/css      # Site-wide footer
│   └── ToggleTheme.js/css # Dark/light mode toggle
├── data/
│   ├── projects.js        # Project data by category
│   ├── experience.js      # Work experience data
│   ├── education.js       # Academic + certification data
│   └── activities.js      # Extracurricular activities
└── styles/
    └── global.css          # Design system + theme variables
```

## Features

- 🌗 Dark/Light mode with localStorage persistence
- 🔍 Project search with keyword filtering
- 📱 Fully responsive (mobile-first)
- 🎨 Lime green accent theme
- ♿ Accessible navigation with ARIA attributes
- 🎬 Smooth animations and micro-interactions

## Author

**Rachid Kherbech** — [rachidkherbech@gmail.com](mailto:rachidkherbech@gmail.com)
