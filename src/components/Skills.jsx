import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';

const TABS = [
  { id: 'languages', label: 'Languages' },
  { id: 'frameworks', label: 'Frameworks' },
  { id: 'tools', label: 'Tools' },
  { id: 'soft', label: 'Soft Skills' },
];

const SKILLS = {
  languages: [
    { icon: 'fa-brands fa-html5', name: 'HTML', pct: 95 },
    { icon: 'fa-brands fa-css3-alt', name: 'CSS', pct: 90 },
    { icon: 'fa-brands fa-js', name: 'JavaScript', pct: 80 },
    { icon: 'fa-brands fa-java', name: 'Java', pct: 75 },
    { icon: 'fa-brands fa-python', name: 'Python', pct: 70 },
    { icon: 'fa-solid fa-hashtag', name: 'C#', pct: 65 },
    { icon: 'fa-solid fa-database', name: 'SQL', pct: 85 },
  ],
  frameworks: [
    { icon: 'fa-solid fa-mobile-screen', name: 'Flutter', pct: 60 },
    { icon: 'fa-brands fa-microsoft', name: 'ASP.NET', pct: 60 },
    { icon: 'fa-solid fa-fire', name: 'Firebase', pct: 55 },
    { icon: 'fa-brands fa-node-js', name: 'Node.js', pct: 55 },
  ],
  tools: [
    { icon: 'fa-brands fa-git-alt', name: 'Git', pct: 85 },
    { icon: 'fa-brands fa-github', name: 'GitHub', pct: 85 },
    { icon: 'fa-solid fa-code', name: 'VS Code', pct: 95 },
    { icon: 'fa-regular fa-window-restore', name: 'Visual Studio', pct: 70 },
    { icon: 'fa-brands fa-figma', name: 'Figma', pct: 65 },
    { icon: 'fa-solid fa-server', name: 'XAMPP', pct: 80 },
    { icon: 'fa-solid fa-database', name: 'MySQL / HeidiSQL', pct: 85 },
  ],
};

const SOFT_SKILLS = [
  { icon: 'fa-solid fa-people-group', label: 'Leadership' },
  { icon: 'fa-solid fa-comments', label: 'Communication' },
  { icon: 'fa-solid fa-brain', label: 'Critical Thinking' },
  { icon: 'fa-solid fa-puzzle-piece', label: 'Problem Solving' },
  { icon: 'fa-solid fa-handshake', label: 'Teamwork' },
  { icon: 'fa-solid fa-clock', label: 'Time Management' },
];

function SkillCard({ icon, name, pct, delay }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible', 'in-view');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="skill-card"
      data-reveal=""
      style={{ transitionDelay: `${delay}ms` }}
    >
      <i className={icon}></i>
      <h4>{name}</h4>
      <div className="bar">
        <span style={{ '--pct': `${pct}%` }}></span>
      </div>
      <em>{pct}%</em>
    </div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState('languages');

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <Reveal as="p" className="section__eyebrow">
          What I Work With
        </Reveal>
        <Reveal as="h2" className="section__title">
          Skills &amp; Tools
        </Reveal>

        <Reveal className="skills__tabs" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`skills__tab${activeTab === tab.id ? ' active' : ''}`}
              data-tab={tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </Reveal>

        <div className="skills__panel active" data-panel={activeTab}>
          {activeTab === 'soft' ? (
            <div className="soft-grid">
              {SOFT_SKILLS.map((skill, index) => (
                <Reveal
                  className="soft-pill"
                  delay={index * 50}
                  key={skill.label}
                >
                  <i className={skill.icon}></i> {skill.label}
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="skill-grid">
              {SKILLS[activeTab].map((skill, index) => (
                <SkillCard
                  key={skill.name}
                  icon={skill.icon}
                  name={skill.name}
                  pct={skill.pct}
                  delay={index * 50}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
