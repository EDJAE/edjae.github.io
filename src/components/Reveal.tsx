import {
  useEffect,
  useRef,
  type ElementType,
  type MutableRefObject,
  type ReactNode,
  type Ref,
} from 'react';

type RevealProps = {
  as?: ElementType;
  delay?: number;
  className?: string;
  children?: ReactNode;
  innerRef?: Ref<HTMLElement> | ((node: HTMLElement | null) => void);
  [key: string]: unknown;
};

export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  className = '',
  children,
  innerRef,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  const setRefs = (node: HTMLElement | null) => {
    ref.current = node;
    if (typeof innerRef === 'function') innerRef(node);
    else if (innerRef) (innerRef as MutableRefObject<HTMLElement | null>).current = node;
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
