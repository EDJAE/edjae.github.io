import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';
import { attachMagnetic, attachRipple } from '../utils/effects.js';

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' };

const VALIDATORS = {
  name: (value) => value.trim().length > 1,
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  subject: (value) => value.trim().length > 1,
  message: (value) => value.trim().length > 5,
};

const FIELDS = [
  { name: 'name', id: 'cName', label: 'Your Name', type: 'text', error: 'Please enter your name.' },
  {
    name: 'email',
    id: 'cEmail',
    label: 'Your Email',
    type: 'email',
    error: 'Please enter a valid email.',
  },
  {
    name: 'subject',
    id: 'cSubject',
    label: 'Subject',
    type: 'text',
    error: 'Please enter a subject.',
  },
  {
    name: 'message',
    id: 'cMessage',
    label: 'Message',
    type: 'textarea',
    error: 'Please enter a message.',
  },
];

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ text: '', color: '' });
  const submitRef = useRef(null);
  const statusTimer = useRef(null);

  useEffect(() => {
    const el = submitRef.current;
    if (!el) return;
    const cleanups = [attachMagnetic(el), attachRipple(el)];
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  useEffect(() => () => clearTimeout(statusTimer.current), []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name] && VALIDATORS[name](value)) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    let valid = true;

    Object.entries(VALIDATORS).forEach(([name, validate]) => {
      const ok = validate(form[name]);
      nextErrors[name] = !ok;
      if (!ok) valid = false;
    });

    setErrors(nextErrors);

    if (!valid) {
      setStatus({ text: 'Please fix the highlighted fields.', color: '#f87171' });
      return;
    }

    setStatus({
      text: "Message sent! I'll get back to you soon.",
      color: 'var(--success)',
    });
    setForm(INITIAL_FORM);
    clearTimeout(statusTimer.current);
    statusTimer.current = setTimeout(() => setStatus({ text: '', color: '' }), 5000);
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <Reveal as="p" className="section__eyebrow">
          Get In Touch
        </Reveal>
        <Reveal as="h2" className="section__title">
          Let&apos;s Build Something
        </Reveal>

        <div className="contact__grid">
          <Reveal className="contact__info">
            <p>
              Have a project, an internship opening, or just a question about one of my builds? My
              inbox is open.
            </p>
            <ul className="contact__list">
              <li>
                <i className="fa-solid fa-envelope"></i> edjaeursal90@gmail.com
              </li>
              <li>
                <i className="fa-solid fa-phone"></i>09351853538
              </li>
              <li>
                <i className="fa-solid fa-location-dot"></i>Pangabuan,Tangub,City
              </li>
            </ul>
            <div className="hero__socials contact__socials">
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

          <Reveal
            as="form"
            className="contact__form"
            id="contactForm"
            delay={150}
            noValidate
            onSubmit={handleSubmit}
          >
            {FIELDS.map((field) => (
              <div className={`field${errors[field.name] ? ' is-invalid' : ''}`} key={field.name}>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.id}
                    name={field.name}
                    rows="5"
                    placeholder=" "
                    required
                    value={form[field.name]}
                    onChange={handleChange}
                  ></textarea>
                ) : (
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.name}
                    placeholder=" "
                    required
                    value={form[field.name]}
                    onChange={handleChange}
                  />
                )}
                <label htmlFor={field.id}>{field.label}</label>
                <span className="field__error">{field.error}</span>
              </div>
            ))}

            <button
              type="submit"
              className="btn btn--primary ripple magnetic"
              id="contactSubmit"
              ref={submitRef}
            >
              <i className="fa-solid fa-paper-plane"></i> Send Message
            </button>
            <p className="form__status" id="formStatus" role="status" style={{ color: status.color }}>
              {status.text}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
