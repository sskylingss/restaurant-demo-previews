const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) entry.target.classList.add("on");
}), { threshold: 0.14 });
document.querySelectorAll(".reveal").forEach((item) => reveal.observe(item));
