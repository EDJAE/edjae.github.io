import { useEffect, useRef } from 'react';

export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  className = '',
  children,
  innerRef,
  ...rest
}) {
  const ref = useRef(null);

  const setRefs = (node) => {
    ref.current = node;
    if (typeof innerRef === 'function') innerRef(node);
    else if (innerRef) innerRef.current = node;
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add('is-visible'), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag ref={setRefs} className={className} data-reveal="" {...rest}>
      {children}
    </Tag>
  );
}
