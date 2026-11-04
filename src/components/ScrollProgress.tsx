import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const scrolled = max > 0 ? (doc.scrollTop / max) * 100 : 0;
      if (ref.current) ref.current.style.width = `${scrolled}%`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div id="scrollProgress" ref={ref} className="scroll-progress" />;
}
