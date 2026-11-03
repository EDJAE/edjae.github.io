# Edjae Ursal — Portfolio

A personal portfolio built with React and Vite. It showcases my background, skills, projects, education timeline, services, and contact information with smooth animations and a responsive, accessible layout.

**Live site:** https://edjae.github.io

## Tech Stack

- React 18
- Vite 6
- CSS (custom design system with CSS variables)
- Font Awesome icons
- Google Fonts (Space Grotesk, Inter, Poppins, JetBrains Mono)

## Features

- Terminal-style loading screen
- Scroll progress bar and scrollspy navigation
- Projects dropdown with smooth scroll and card highlighting
- Animated typing effect in the hero section
- Particle background and mouse-tilt profile card
- Scroll-reveal animations using `IntersectionObserver`
- Animated statistics counters
- Tabbed skills section with animated progress bars
- Responsive layout with mobile navigation
- Contact form with client-side validation
- Magnetic buttons and ripple effects
- Back-to-top button

## Getting Started

### Requirements

- Node.js 18 or newer
- npm

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

### Build for production

```bash
npm run build
```

The production files are generated in the `dist/` folder.

### Preview the production build

```bash
npm run preview
```

## Project Structure

```text
.
├── index.html
├── package.json
├── vite.config.js
├── public/
│   ├── images/          # Project and profile images
│   └── resume/          # Downloadable resume
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── index.css
    ├── components/
    │   ├── About.jsx
    │   ├── Contact.jsx
    │   ├── Footer.jsx
    │   ├── Hero.jsx
    │   ├── Loader.jsx
    │   ├── Navbar.jsx
    │   ├── Particles.jsx
    │   ├── Projects.jsx
    │   ├── Reveal.jsx
    │   ├── ScrollProgress.jsx
    │   ├── Services.jsx
    │   ├── Skills.jsx
    │   ├── Stats.jsx
    │   └── Timeline.jsx
    └── utils/
        └── effects.js
```

## Deployment

This project uses Vite, so the site must be built before it can be served by GitHub Pages. Build the project with `npm run build` and deploy the contents of `dist/`, or use a GitHub Actions workflow to build and publish automatically.

## Contact

- Email: edjaeursal90@gmail.com
- GitHub: https://github.com/EDJAE
- Facebook: https://www.facebook.com/aifhshcj
- Instagram: https://www.instagram.com/ur_edjae/

## Author

**Edjae Ursal**
