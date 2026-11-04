import Reveal from './Reveal';

const ITEMS = [
  {
    date: 'Ongoing',
    title: 'BSCS Tangub City Global College',
    description:
      'Coursework spanning software development, linear algebra, research methods, and cybersecurity; currently developing a thesis proposal on an Online Learning & Student Assessment System.',
    delay: 0,
  },
  {
    date: 'Case Study',
    title: 'Cybersecurity Case Study Senate Website Defacement',
    description:
      'Researched and presented a 7-slide case study analyzing the Philippine Senate website defacement incident, covering attack vectors and mitigation strategies.',
    delay: 100,
  },
  {
    date: 'Final Project',
    title: 'Nine-API PHP + MySQL Suite',
    description:
      'Designed and built nine complete themed CRUD APIs Student Management, Patient Management, Restaurant Menu, Attendance, Library, Events, Inventory, and more — each with its own frontend.',
    delay: 0,
  },
  {
    date: 'Reading',
    title: 'Gray Hat Hacking, 6th Edition Book Review',
    description:
      'Completed an in-depth review connecting offensive security concepts to practical, defensible coding habits.',
    delay: 100,
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="section timeline">
      <div className="container">
        <Reveal as="p" className="section__eyebrow">
          My Journey
        </Reveal>
        <Reveal as="h2" className="section__title">
          Education &amp; Milestones
        </Reveal>

        <div className="timeline__track">
          {ITEMS.map((item) => (
            <Reveal className="timeline__item" delay={item.delay} key={item.title}>
              <div className="timeline__dot"></div>
              <div className="timeline__card">
                <span className="timeline__date">{item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
