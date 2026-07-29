const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.13, rootMargin: '0px 0px -5% 0px' });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 3, 2) * 90}ms`;
  observer.observe(element);
});

const ribbon = document.querySelector('.menu-ribbon span');
if (ribbon) ribbon.textContent += ribbon.textContent;

window.addEventListener('scroll', () => {
  const note = document.querySelector('.hero-note');
  if (note && window.scrollY < window.innerHeight) note.style.translate = `0 ${window.scrollY * .1}px`;
}, { passive: true });
