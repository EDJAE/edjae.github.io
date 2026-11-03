import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';

const STATS = [
  { target: 9, label: 'Projects Built', delay: 0 },
  { target: 18, label: 'Skills & Tools', delay: 200 },
  { target: 3, label: 'Years Learning to Code', delay: 300 },
];

function Counter({ target }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const step = Math.max(1, Math.ceil(target / 60));
          let current = 0;

          timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            setValue(current);
          }, 25);

          observer.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, [target]);

  return (
    <span ref={ref} className="stat__num" data-count={target}>
      {value}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="stats">
      <div className="container stats__grid">
        {STATS.map((stat) => (
          <Reveal className="stat" delay={stat.delay} key={stat.label}>
            <Counter target={stat.target} />
            <span className="stat__plus">+</span>
            <p>{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
