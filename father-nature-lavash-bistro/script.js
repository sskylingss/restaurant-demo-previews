const header = document.querySelector('[data-header]');
const toggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');

toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('is-open', !open);
  document.body.classList.toggle('menu-open', !open);
});

document.addEventListener('scroll', () => header?.classList.toggle('is-scrolled', scrollY > 40), { passive: true });

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => observer.observe(el));

const day = new Date().getDay();
const today = day >= 1 && day <= 3 ? '10am–7pm' : day === 4 || day === 5 ? '10am–8pm' : '11am–7pm';
document.querySelectorAll('[data-today-hours]').forEach((el) => { el.textContent = today; });
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

