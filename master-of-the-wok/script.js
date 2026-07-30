document.documentElement.classList.add("js");

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries, activeObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      activeObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  observer.observe(item);
});

window.addEventListener("load", () => {
  document.querySelectorAll(".hero .reveal").forEach((item) => {
    item.classList.add("is-visible");
  });
});
