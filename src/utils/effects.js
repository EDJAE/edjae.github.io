export function attachMagnetic(el) {
  if (!el || window.matchMedia('(hover: none)').matches) return () => {};

  const move = (event) => {
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
  };

  const leave = () => {
    el.style.transform = '';
  };

  el.addEventListener('mousemove', move);
  el.addEventListener('mouseleave', leave);

  return () => {
    el.removeEventListener('mousemove', move);
    el.removeEventListener('mouseleave', leave);
  };
}

export function attachRipple(el) {
  if (!el) return () => {};

  const click = (event) => {
    const rect = el.getBoundingClientRect();
    const circle = document.createElement('span');
    const size = Math.max(rect.width, rect.height);

    circle.className = 'ripple-circle';
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${event.clientX - rect.left - size / 2}px`;
    circle.style.top = `${event.clientY - rect.top - size / 2}px`;

    el.appendChild(circle);
    setTimeout(() => circle.remove(), 650);
  };

  el.addEventListener('click', click);
  return () => el.removeEventListener('click', click);
}
