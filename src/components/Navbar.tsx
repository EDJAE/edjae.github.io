import { useEffect, useRef, useState, type MouseEvent } from 'react';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
];

const TAIL_LINKS = [
  { href: '#timeline', label: 'Timeline' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
];

const PROJECTS = [
  'Regular Expression Game',
  'Online Food Ordering System',
  'TCGC Confession App',
  'All Anime Characters',
  'Compile// Lexical Console',
  'This Portfolio',
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [active, setActive] = useState('home');

  const dropdownRef = useRef<HTMLLIElement>(null);
  const lastY = useRef(0);

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('main section[id]')];

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setHidden(y > lastY.current && y > 76);
      lastY.current = y;

      let current = sections[0]?.id;
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= 140) current = section.id;
      });
      if (current) setActive(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onDocumentClick = (event: globalThis.MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const closeMenus = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((open) => {
      const next = !open;
      if (!next) setDropdownOpen(false);
      return next;
    });
  };

  const handleProjectClick = (event: MouseEvent<HTMLAnchorElement>, title: string) => {
    event.preventDefault();
    setDropdownOpen(false);
    setMenuOpen(false);

    setTimeout(() => {
      const card = [...document.querySelectorAll<HTMLElement>('.project-card')].find(
        (item) => item.querySelector('h3')?.textContent?.trim() === title
      );

      if (!card) return;

      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.classList.add('project-card--highlight');
      setTimeout(() => card.classList.remove('project-card--highlight'), 1200);
    }, 400);
  };

  const navClass = `nav-link${active === 'projects' ? ' active' : ''}`;

  return (
    <header
      id="navbar"
      className={`navbar${scrolled ? ' is-scrolled' : ''}${hidden ? ' is-hidden' : ''}`}
    >
      <nav className="navbar__inner">
        <a href="#home" className="navbar__logo" onClick={closeMenus}>
          Edjae<span className="dot">.</span>
        </a>

        <ul className={`navbar__links${menuOpen ? ' is-open' : ''}`} id="navLinks">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`nav-link${active === link.href.slice(1) ? ' active' : ''}`}
                data-link=""
                onClick={closeMenus}
              >
                {link.label}
              </a>
            </li>
          ))}

          <li
            className={`nav-item nav-item--dropdown${dropdownOpen ? ' is-open' : ''}`}
            id="projectsDropdown"
            ref={dropdownRef}
          >
            <a
              href="#projects"
              className={navClass}
              data-link=""
              id="projectsDropdownTrigger"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              onClick={(event) => {
                event.preventDefault();
                setDropdownOpen((open) => !open);
              }}
            >
              Projects <i className="fa-solid fa-chevron-down dropdown-caret"></i>
            </a>

            <ul className="dropdown-menu" role="menu" aria-labelledby="projectsDropdownTrigger">
              {PROJECTS.map((title) => (
                <li role="none" key={title}>
                  <a
                    href="#projects"
                    className="dropdown-link"
                    data-link=""
                    role="menuitem"
                    onClick={(event) => handleProjectClick(event, title)}
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </li>

          {TAIL_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`nav-link${active === link.href.slice(1) ? ' active' : ''}`}
                data-link=""
                onClick={closeMenus}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          id="navToggle"
          className={`navbar__toggle${menuOpen ? ' is-open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>
  );
}
