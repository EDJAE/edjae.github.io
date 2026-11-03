import Reveal from './Reveal.jsx';

const SERVICES = [
  {
    icon: 'fa-solid fa-globe',
    title: 'Web Development',
    description: 'Responsive, accessible websites built with clean HTML, CSS, and JavaScript.',
  },
  {
    icon: 'fa-solid fa-desktop',
    title: 'Desktop Applications',
    description: 'Task-focused desktop tools built with C# and .NET.',
  },
  {
    icon: 'fa-solid fa-mobile-screen-button',
    title: 'Mobile Development',
    description: 'Cross-platform app prototypes using Flutter and Firebase.',
  },
  {
    icon: 'fa-solid fa-pen-ruler',
    title: 'UI/UX Design',
    description: "Wireframes and interfaces in Figma that put the user's task first.",
  },
  {
    icon: 'fa-solid fa-database',
    title: 'Database Design',
    description: 'Normalized MySQL schemas and CRUD APIs that scale cleanly.',
  },
  {
    icon: 'fa-solid fa-shield-halved',
    title: 'Security-Minded Builds',
    description:
      'Applications designed with basic threat modeling and safe defaults in mind.',
  },
];

export default function Services() {
  return (
    <section id="services" className="section services">
      <div className="container">
        <Reveal as="p" className="section__eyebrow">
          What I Can Help With
        </Reveal>
        <Reveal as="h2" className="section__title">
          Services
        </Reveal>

        <div className="service-grid">
          {SERVICES.map((service, index) => (
            <Reveal
              className="service-card"
              delay={index * 50}
              key={service.title}
            >
              <i className={service.icon}></i>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
