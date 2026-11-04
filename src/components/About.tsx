import Reveal from './Reveal';

const FACTS = [
  {
    icon: 'fa-solid fa-graduation-cap',
    label: 'Education',
    value: 'BSCS, Tangub City Global College',
  },
  {
    icon: 'fa-solid fa-location-dot',
    label: 'Based in',
    value: 'Tangub City, Misamis Occidental',
  },
  {
    icon: 'fa-solid fa-language',
    label: 'Languages',
    value: 'English, Filipino, Cebuano/Bisaya',
  },
  {
    icon: 'fa-solid fa-crosshairs',
    label: 'Focus',
    value: 'Full-Stack Dev & Cybersecurity',
  },
  {
    icon: 'fa-solid fa-mug-hot',
    label: 'Currently',
    value: 'Writing my thesis proposal',
  },
];

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <Reveal as="p" className="section__eyebrow">
          About Me
        </Reveal>
        <Reveal as="h2" className="section__title">
          Building things, breaking things, learning either way.
        </Reveal>

        <div className="about__grid">
          <Reveal className="about__text">
            <p>
              I&apos;m a Computer Science undergraduate at{' '}
              <strong>Tangub City Global College (TCGC)</strong>, working through coursework in
              software development,research methods, and cybersecurity and enjoying almost all of it
              more than I expected to.
            </p>
            <p>
              My objective is simple: become a software engineer who can move comfortably between the
              front end, the back end, and the database and who understands the security implications
              of every layer in between. Recent work includes a full suite of PHP + MySQL CRUD APIs,
              a browser-based lexical analyzer, and a cybersecurity case study on the Philippine
              Senate website defacement incident.
            </p>
            <p>
              Outside of class, I&apos;m usually deep in a personal tool, a thesis draft, or a rabbit
              hole about how compilers actually work.
            </p>
          </Reveal>

          <Reveal className="about__card" delay={150}>
            <h3>Quick Facts</h3>
            <ul className="facts">
              {FACTS.map((fact) => (
                <li key={fact.label}>
                  <i className={fact.icon}></i>{' '}
                  <div>
                    <span>{fact.label}</span>
                    {fact.value}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
