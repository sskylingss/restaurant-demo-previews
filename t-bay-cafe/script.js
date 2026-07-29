const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  }
}, { threshold: 0.14, rootMargin: '0px 0px -5% 0px' });

reveals.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 3, 2) * 90}ms`;
  observer.observe(element);
});

const ticker = document.querySelector('.ticker div');
if (ticker) ticker.textContent += ticker.textContent;

window.addEventListener('scroll', () => {
  const disc = document.querySelector('.sun-disc');
  if (disc && window.scrollY < window.innerHeight) {
    disc.style.translate = `0 ${window.scrollY * .12}px`;
  }
}, { passive: true });
