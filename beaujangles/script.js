const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const reveals = document.querySelectorAll(".reveal");
if (reduced) reveals.forEach((el) => el.classList.add("seen"));
else {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add("seen"); observer.unobserve(entry.target); }
  }), { threshold: .13 });
  reveals.forEach((el) => observer.observe(el));
}

