import Reveal from './Reveal';

const PROJECTS = [
  {
    title: 'Regular Expression Game',
    image: '/images/RegEx_Game.png',
    alt: 'Regex Challenge game preview',
    description:
      'A fun, browser-based game that helps players practice identifying and matching regular expressions through interactive challenges built with HTML, CSS, and JavaScript.',
    badges: ['HTML', 'CSS', 'JavaScript'],
    delay: 0,
  },
  {
    title: 'Online Food Ordering System',
    image: '/images/online_food_ordering.png',
    alt: 'Online Food Ordering System preview',
    description:
      'A restaurant ordering system with menu browsing, customer orders, order tracking, and CRUD operations powered by PHP and MySQL.',
    badges: ['C#', 'HTML', 'CSS', 'Bootstrap', 'SQL'],
    delay: 100,
  },
  {
    title: 'TCGC Confession App',
    image: '/images/confess.png',
    alt: 'TCGC Confession App preview',
    description:
      'An anonymous confession & announcement board built for the TCGC student community, focused on simple moderation, fast posting, and a friendly, familiar interface.',
    badges: ['Flutter', 'Firebase'],
    delay: 200,
  },
  {
    title: 'All Anime Characters',
    image: '/images/anime.jpg',
    alt: 'All Anime Characters project preview',
    description:
      'An anime character collection that lets fans explore memorable characters, discover details about their abilities and stories, and enjoy a colorful anime-inspired experience.',
    badges: ['HTML', 'CSS', 'API'],
    delay: 0,
  },
  {
    title: 'Compile// Lexical Console',
    image: '/images/lex.png',
    alt: 'Lexical Console project preview',
    description:
      'A browser-based lexical analyzer that breaks source code into tokens and helps learners understand identifiers, keywords, literals, and symbols through a live console.',
    badges: ['HTML/CSS/JS', 'Compilers'],
    delay: 100,
  },
  {
    title: 'This Portfolio',
    image: '/images/edjae.png',
    alt: 'Edjae portfolio preview',
    description:
      "You're looking at it — a hand-built, framework-free portfolio focused on smooth motion, accessible interactions, and a design system that's easy for me to keep extending.",
    badges: ['HTML', 'CSS', 'Vanilla JS'],
    delay: 200,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <Reveal as="p" className="section__eyebrow">
          Selected Work
        </Reveal>
        <Reveal as="h2" className="section__title">
          Featured Projects
        </Reveal>

        <div className="project-grid">
          {PROJECTS.map((project) => (
            <Reveal
              as="article"
              className="project-card project-card--centered"
              delay={project.delay}
              key={project.title}
            >
              <div className="project-card__media">
                <img src={project.image} alt={project.alt} className="project-card__image" />
              </div>
              <div className="project-card__body">
                <div className="badges">
                  {project.badges.map((badge) => (
                    <span className="badge" key={badge}>
                      {badge}
                    </span>
                  ))}
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-card__links">
                  <a
                    href="https://github.com/edjae"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--ghost btn--sm"
                  >
                    <i className="fa-brands fa-github"></i> GitHub
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
