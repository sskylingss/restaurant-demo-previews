document.documentElement.classList.add('js');

const homeScene = document.querySelector('[data-home-scene]');
const menuScene = document.querySelector('[data-menu-scene]');
const openButtons = [...document.querySelectorAll('[data-open-menu]')];
const closeButton = document.querySelector('[data-close-menu]');
const categoryButtons = [...document.querySelectorAll('[data-menu-category]')];
const panels = [...document.querySelectorAll('[data-menu-panel]')];
const menuScroll = document.querySelector('.menu-scene__scroll');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const focusable = 'button:not([disabled]),a[href],summary,[tabindex]:not([tabindex="-1"])';
let lastFocused = null;

function setMenuOpen(open) {
  menuScene.classList.toggle('is-open', open);
  menuScene.setAttribute('aria-hidden', String(!open));
  menuScene.setAttribute('aria-modal', String(open));
  homeScene.inert = open;
  document.body.classList.toggle('menu-open', open);
  openButtons.forEach((button) => button.setAttribute('aria-expanded', String(open)));

  if (open) {
    lastFocused = document.activeElement;
    const focusClose = () => closeButton.focus();
    if (reduceMotion) focusClose();
    else requestAnimationFrame(focusClose);
  } else if (lastFocused instanceof HTMLElement) {
    lastFocused.focus();
  }
}

function selectCategory(name) {
  categoryButtons.forEach((button) => {
    const selected = button.dataset.menuCategory === name;
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  panels.forEach((panel) => {
    panel.hidden = panel.dataset.menuPanel !== name;
  });
  menuScroll.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
}

openButtons.forEach((button) => button.addEventListener('click', (event) => {
  event.preventDefault();
  setMenuOpen(true);
}));

closeButton.addEventListener('click', () => setMenuOpen(false));
categoryButtons.forEach((button) => button.addEventListener('click', () => selectCategory(button.dataset.menuCategory)));

menuScene.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    setMenuOpen(false);
    return;
  }
  if (event.key !== 'Tab') return;

  const items = [...menuScene.querySelectorAll(focusable)].filter((item) => !item.closest('[hidden]'));
  const first = items[0];
  const last = items.at(-1);
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

selectCategory('breakfast');
setMenuOpen(false);
