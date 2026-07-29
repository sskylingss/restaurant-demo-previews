const reveal = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      reveal.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((item) => reveal.observe(item));

const hero = document.querySelector(".hero-image");
if (hero && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addEventListener("scroll", () => {
    const y = Math.min(scrollY, innerHeight);
    hero.style.transform = `scale(${1 + y * 0.00006}) translateY(${y * 0.035}px)`;
  }, { passive: true });
}
