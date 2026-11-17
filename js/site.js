const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
  });
}

const filterButtons = [...document.querySelectorAll("[data-filter]")];
const entries = [...document.querySelectorAll(".entry")];
const emptyNote = document.querySelector(".empty-note");

function applyFilter(filter) {
  filterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === filter);
  });

  let visible = 0;
  entries.forEach((entry) => {
    const show = filter === "all" || entry.dataset.topic === filter;
    entry.classList.toggle("is-hidden", !show);
    if (show) visible += 1;
  });

  if (emptyNote) emptyNote.classList.toggle("is-visible", visible === 0);
}

if (filterButtons.length && entries.length) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => applyFilter(button.dataset.filter));
  });

  const requested = new URLSearchParams(window.location.search).get("topic");
  const known = filterButtons.some((button) => button.dataset.filter === requested);
  if (requested && known) applyFilter(requested);
}
