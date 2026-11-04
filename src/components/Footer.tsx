const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  const backToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <a href="#home" className="navbar__logo" data-link="">
            EJ<span className="dot">.</span>
          </a>
          <p>
            Software engineer in training, one project at a time Tangub City, Philippines.
          </p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} data-link="">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Follow</h4>
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
        </div>
      </div>
      <div className="footer__bottom container">
        <p>&copy; {new Date().getFullYear()} Edjae Ursal. All rights reserved.</p>
        <button id="backToTop" className="back-to-top" aria-label="Back to top" onClick={backToTop}>
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      </div>
    </footer>
  );
}
