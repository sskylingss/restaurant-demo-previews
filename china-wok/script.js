const toggle = document.querySelector(".menu-toggle");
const panel = document.querySelector(".nav-panel");

if (toggle && panel) {
  toggle.addEventListener("click", () => {
    const open = panel.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  panel.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    panel.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}
