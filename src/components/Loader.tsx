import { useEffect, useState } from 'react';

const LINES = ['booting portfolio...', 'compiling components...', 'ready.'];

export default function Loader() {
  const [text, setText] = useState('');
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const tick = () => {
      if (lineIndex >= LINES.length) {
        timer = setTimeout(() => setHidden(true), 350);
        return;
      }

      const line = LINES[lineIndex];

      if (charIndex <= line.length) {
        setText(line.slice(0, charIndex));
        charIndex += 1;
        timer = setTimeout(tick, 28);
      } else {
        lineIndex += 1;
        charIndex = 0;
        timer = setTimeout(tick, 300);
      }
    };

    tick();
    const safety = setTimeout(() => setHidden(true), 4000);

    return () => {
      if (timer) clearTimeout(timer);
      clearTimeout(safety);
    };
  }, []);

  return (
    <div id="loader" className={`loader${hidden ? ' is-hidden' : ''}`} aria-hidden="true">
      <div className="loader__terminal">
        <span className="loader__prompt">$</span>
        <span id="loaderText" className="loader__text">
          {text}
        </span>
        <span className="loader__cursor">▊</span>
      </div>
    </div>
  );
}
