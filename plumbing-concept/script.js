const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

toggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

nav?.addEventListener('click', (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
  }
});

document.querySelector('[data-demo-confirm]')?.addEventListener('click', (event) => {
  const status = event.currentTarget.closest('[data-demo-form]')?.querySelector('.form-status');
  if (!status) return;
  status.textContent = 'Demo only — a finished website would send this request to the business owner.';
});
