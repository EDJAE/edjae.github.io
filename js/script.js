/* ==========================================================================
   PORTFOLIO SCRIPT — all vanilla JS, organized by feature.
   Each feature is wrapped in its own function and initialized at the bottom.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
   initScrollProgress();
  initNavbar();
  initNavDropdown();
  initTypingEffect();
  initReveal();
  initTilt();
  initMagnetic();
  initRipple();
  initParticles();
  initCounters();
  initSkillTabs();
  initSkillBars();
  initCertModal();
  initTestimonials();
  initContactForm();
  initBackToTop();
  document.getElementById('year').textContent = new Date().getFullYear();
});

/* ---------- LOADER ---------- */
function initLoader(){
  const loader = document.getElementById('loader');
  const textEl = document.getElementById('loaderText');
  const lines = ['booting portfolio...', 'compiling components...', 'ready.'];
  let i = 0, char = 0;

  function typeLine(){
    if (i >= lines.length){
      setTimeout(() => loader.classList.add('is-hidden'), 350);
      return;
    }
    const line = lines[i];
    if (char <= line.length){
      textEl.textContent = line.slice(0, char);
      char++;
      setTimeout(typeLine, 28);
    } else {
      i++; char = 0;
      setTimeout(typeLine, 300);
    }
  }
  typeLine();

  // Safety net: never let the loader block the page for more than 4s
  setTimeout(() => loader.classList.add('is-hidden'), 4000);
}

/* ---------- SCROLL PROGRESS BAR ---------- */
function initScrollProgress(){
  const bar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    bar.style.width = scrolled + '%';
  }, { passive: true });
}

/* ---------- NAVBAR: scrollspy + hide-on-scroll + mobile toggle ---------- */
function initNavbar(){
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const navLinkEls = document.querySelectorAll('.nav-link');
  const sections = [...document.querySelectorAll('main section[id]')];

  let lastY = window.scrollY;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('is-scrolled', y > 30);

    // hide on scroll down, show on scroll up
    if (y > lastY && y > var_navH()) {
      navbar.classList.add('is-hidden');
    } else {
      navbar.classList.remove('is-hidden');
    }
    lastY = y;

    // scrollspy
    let current = sections[0]?.id;
    for (const sec of sections){
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 140) current = sec.id;
    }
    navLinkEls.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }, { passive: true });

  function var_navH(){ return 76; }

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.classList.remove('is-open');
    });
  });
}

/* ---------- NAVBAR DROPDOWN (Projects) — pure DOM, no libraries ---------- */
function initNavDropdown(){
  const dropdown = document.getElementById('projectsDropdown');
  if (!dropdown) return;

  const trigger = document.getElementById('projectsDropdownTrigger');
  const menu = dropdown.querySelector('.dropdown-menu');

  function openDropdown(){
    dropdown.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
  }
  function closeDropdown(){
    dropdown.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
  }
  function toggleDropdown(e){
    e.preventDefault();
    dropdown.classList.contains('is-open') ? closeDropdown() : openDropdown();
  }

  // Toggle on click (works for both desktop and mobile menu)
  trigger.addEventListener('click', toggleDropdown);

  // Keyboard support: Enter/Space opens, Escape closes, arrows move focus
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') toggleDropdown(e);
    if (e.key === 'Escape') closeDropdown();
  });

  // Clicking a project link scrolls to #projects, then highlights that card
  menu.querySelectorAll('.dropdown-link').forEach(link => {
    link.addEventListener('click', () => {
      closeDropdown();
      const wantedTitle = link.dataset.project;
      const card = [...document.querySelectorAll('.project-card')]
        .find(c => c.querySelector('h3')?.textContent.trim() === wantedTitle);
      if (card){
        setTimeout(() => {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          card.classList.add('project-card--highlight');
          setTimeout(() => card.classList.remove('project-card--highlight'), 1200);
        }, 400);
      }
    });
  });

  // Click outside the dropdown closes it
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) closeDropdown();
  });

  // Escape anywhere closes it
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDropdown();
  });
}

/* ---------- TYPING EFFECT (hero titles) ---------- */
function initTypingEffect(){
  const el = document.getElementById('typed');
  if (!el) return;
  const phrases = ['Future Software Engineer', 'Full-Stack Developer', 'UI/UX Enthusiast', 'Problem Solver'];
  let phraseIndex = 0, charIndex = 0, deleting = false;

  function tick(){
    const phrase = phrases[phraseIndex];
    if (!deleting){
      charIndex++;
      el.textContent = phrase.slice(0, charIndex);
      if (charIndex === phrase.length){
        deleting = true;
        setTimeout(tick, 1500);
        return;
      }
    } else {
      charIndex--;
      el.textContent = phrase.slice(0, charIndex);
      if (charIndex === 0){
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 35 : 65);
  }
  tick();
}

/* ---------- SCROLL REVEAL (IntersectionObserver) ---------- */
function initReveal(){
  const items = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const delay = entry.target.dataset.revealDelay || 0;
        setTimeout(() => entry.target.classList.add('is-visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(item => observer.observe(item));
}

/* ---------- MOUSE TILT ON HERO PROFILE ---------- */
function initTilt(){
  const card = document.getElementById('tiltCard');
  if (!card || matchMedia('(hover: none)').matches) return;
  const wrapper = card.closest('.hero__visual');

  wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 18}deg)`;
  });
  wrapper.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateY(0deg) rotateX(0deg)';
  });
}

/* ---------- MAGNETIC BUTTONS ---------- */
function initMagnetic(){
  if (matchMedia('(hover: none)').matches) return;
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

/* ---------- RIPPLE EFFECT ON BUTTONS ---------- */
function initRipple(){
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function (e){
      const rect = this.getBoundingClientRect();
      const circle = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      circle.className = 'ripple-circle';
      circle.style.width = circle.style.height = size + 'px';
      circle.style.left = (e.clientX - rect.left - size / 2) + 'px';
      circle.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 650);
    });
  });
}

/* ---------- LIGHTWEIGHT PARTICLE BACKGROUND (hero canvas) ---------- */
function initParticles(){
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let w, h;

  function resize(){
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  function makeParticles(){
    const count = Math.min(60, Math.floor(w / 22));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));
  }

  function draw(){
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(148, 163, 184, 0.5)';
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  makeParticles();
  draw();
  window.addEventListener('resize', () => { resize(); makeParticles(); });
}

/* ---------- ANIMATED STAT COUNTERS ---------- */
function initCounters(){
  const counters = document.querySelectorAll('.stat__num');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const timer = setInterval(() => {
        current += step;
        if (current >= target){ current = target; clearInterval(timer); }
        el.textContent = current;
      }, 25);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

/* ---------- SKILLS TABS ---------- */
function initSkillTabs(){
  const tabs = document.querySelectorAll('.skills__tab');
  const panels = document.querySelectorAll('.skills__panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector(`.skills__panel[data-panel="${tab.dataset.tab}"]`).classList.add('active');
    });
  });
}

/* ---------- SKILL PROGRESS BARS (animate width when visible) ---------- */
function initSkillBars(){
  const cards = document.querySelectorAll('.skill-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  cards.forEach(c => observer.observe(c));
}

/* ---------- CERTIFICATE MODAL ---------- */
function initCertModal(){
  const modal = document.getElementById('certModal');
  const img = document.getElementById('modalImg');
  const title = document.getElementById('modalTitle');
  if (!modal) return;

  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', () => {
      img.src = card.dataset.cert;
      img.alt = card.dataset.title;
      title.textContent = card.dataset.title;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(el => {
    el.addEventListener('click', () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
}

/* ---------- TESTIMONIAL CAROUSEL ---------- */
function initTestimonials(){
  const track = document.getElementById('testimonialTrack');
  if (!track) return;
  const cards = [...track.children];
  const dotsWrap = document.getElementById('testDots');
  const prevBtn = document.getElementById('testPrev');
  const nextBtn = document.getElementById('testNext');
  let index = 0;
  let autoTimer;

  cards.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('is-active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = [...dotsWrap.children];

  function render(){
    cards.forEach((c, i) => c.classList.toggle('is-active', i === index));
    dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
  }
  function goTo(i){ index = (i + cards.length) % cards.length; render(); restartAuto(); }
  function next(){ goTo(index + 1); }
  function prev(){ goTo(index - 1); }
  function restartAuto(){ clearInterval(autoTimer); autoTimer = setInterval(next, 6000); }

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  render();
  restartAuto();
}

/* ---------- CONTACT FORM VALIDATION ---------- */
function initContactForm(){
  const form = document.getElementById('contactForm');
  if (!form) return;
  const status = document.getElementById('formStatus');

  const validators = {
    cName: (v) => v.trim().length > 1,
    cEmail: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    cSubject: (v) => v.trim().length > 1,
    cMessage: (v) => v.trim().length > 5,
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    Object.keys(validators).forEach(id => {
      const input = document.getElementById(id);
      const field = input.closest('.field');
      const ok = validators[id](input.value);
      field.classList.toggle('is-invalid', !ok);
      if (!ok) valid = false;
    });

    if (!valid){
      status.style.color = '#f87171';
      status.textContent = 'Please fix the highlighted fields.';
      return;
    }

    // No backend wired up yet — simulate a successful send.
    status.style.color = 'var(--success)';
    status.textContent = 'Message sent! I\'ll get back to you soon.';
    form.reset();
    setTimeout(() => { status.textContent = ''; }, 5000);
  });

  // live re-validation while typing
  Object.keys(validators).forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener('input', () => {
      const field = input.closest('.field');
      if (validators[id](input.value)) field.classList.remove('is-invalid');
    });
  });
}

/* ---------- BACK TO TOP ---------- */
function initBackToTop(){
  const btn = document.getElementById('backToTop');
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
