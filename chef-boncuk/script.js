const toggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
if (toggle && nav) toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', String(!open)); nav.classList.toggle('open', !open); });
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => observer.observe(el));
