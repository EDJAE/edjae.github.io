import { useEffect, useRef, useState } from 'react';
import Particles from './Particles.jsx';
import Reveal from './Reveal.jsx';
import { attachMagnetic, attachRipple } from '../utils/effects.js';

const PHRASES = [
  'Future Software Engineer',
  'Full-Stack Developer',
  'UI/UX Enthusiast',
  'Problem Solver',
];

export default function Hero() {
  const [typed, setTyped] = useState('');
  const ctaRef = useRef(null);
  const visualRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const phrase = PHRASES[phraseIndex];

      if (!deleting) {
        charIndex += 1;
        setTyped(phrase.slice(0, charIndex));
        if (charIndex === phrase.length) {
          deleting = true;
          timer = setTimeout(tick, 1500);
          return;
        }
      } else {
        charIndex -= 1;
        setTyped(phrase.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % PHRASES.length;
        }
      }

      timer = setTimeout(tick, deleting ? 35 : 65);
    };

    tick();
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const card = ringRef.current;
    const wrapper = visualRef.current;

    if (!card || !wrapper || window.matchMedia('(hover: none)').matches) return;

    const move = (event) => {
      const rect = wrapper.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 18}deg)`;
    };

    const leave = () => {
      card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    };

    wrapper.addEventListener('mousemove', move);
    wrapper.addEventListener('mouseleave', leave);

    return () => {
      wrapper.removeEventListener('mousemove', move);
      wrapper.removeEventListener('mouseleave', leave);
    };
  }, []);

  useEffect(() => {
    const container = ctaRef.current;
    if (!container) return;

    const elements = [...container.querySelectorAll('.magnetic')];
    const cleanups = elements.flatMap((el) => [attachMagnetic(el), attachRipple(el)]);

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero__blobs" aria-hidden="true">
        <div className="blob blob--1"></div>
        <div className="blob blob--2"></div>
        <div className="blob blob--3"></div>
      </div>
      <Particles />

      <div className="hero__inner container">
        <Reveal className="hero__content">
          <p className="eyebrow">Hello, I&apos;m</p>
          <h1 className="hero__name">Edjae Ursal</h1>
          <h2 className="hero__title">
            <span id="typed" className="typed">
              {typed}
            </span>
            <span className="typed-cursor">|</span>
          </h2>
          <p className="hero__desc">
            BSCS student at Tangub City Global College, based in Tangub City, Misamis Occidental.
            I like turning coursework into working software from lexical analyzers to full CRUD
            systems and I&apos;m most awake at 2am chasing down one last bug.And i still a student
            but but i have a lot of experience in programing.
          </p>
          <div className="hero__cta" ref={ctaRef}>
            <a
              href="/resume/Edjae_Ursal_Premium_Resume.docx"
              className="btn btn--primary ripple magnetic"
              download
            >
              <i className="fa-solid fa-download"></i> Download Resume
            </a>
            <a href="#projects" className="btn btn--outline ripple magnetic" data-link="">
              <i className="fa-solid fa-arrow-right"></i> View Projects
            </a>
          </div>

          <div className="hero__socials">
            <a
              href="https://github.com/EDJAE"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="social-icon"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://www.facebook.com/aifhshcj"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="social-icon"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a
              href="https://www.instagram.com/ur_edjae/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="social-icon"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </Reveal>

        <Reveal className="hero__visual" delay={150} innerRef={visualRef}>
          <div className="hero__ring" id="tiltCard" ref={ringRef}>
            <img src="/images/ur_edjae.jpg" alt="Edjae Ursal" className="hero__avatar" />
          </div>
          <div className="hero__badge hero__badge--1">
            <i className="fa-solid fa-code"></i> BSCS
          </div>
          <div className="hero__badge hero__badge--2">
            <i className="fa-solid fa-location-dot"></i> Tangub City
          </div>
        </Reveal>
      </div>

      <a href="#about" className="scroll-hint" data-link="" aria-label="Scroll down">
        <span></span>
      </a>
    </section>
  );
}
