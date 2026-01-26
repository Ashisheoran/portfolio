// Theme toggle
const themeBtn = document.getElementById("themeBtn");
const saved = localStorage.getItem("theme");
if (saved) document.documentElement.setAttribute("data-theme", saved);

function icon() {
  const t = document.documentElement.getAttribute("data-theme");
  themeBtn.textContent = t === "light" ? "☀" : "☾";
}
icon();

themeBtn.addEventListener("click", () => {
  const cur = document.documentElement.getAttribute("data-theme");
  const next = cur === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  icon();
});

// Modals
const imgModal = document.getElementById("imgModal");
const imgPreview = document.getElementById("imgPreview");
const imgTitle = document.getElementById("imgTitle");

function closeAllModals() {
  document.querySelectorAll(".modal").forEach(m => m.classList.remove("show"));
  document.body.style.overflow = "";
}

document.addEventListener("click", (e) => {
  const imgBtn = e.target.closest("[data-image]");
  const openModalBtn = e.target.closest("[data-modal]");
  const closeBtn = e.target.closest("[data-close]");
  const overlay = e.target.classList.contains("overlay");

  if (imgBtn) {
    imgPreview.src = imgBtn.getAttribute("data-image");
    imgTitle.textContent = imgBtn.getAttribute("data-title") || "Preview";
    imgModal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  if (openModalBtn) {
    const id = openModalBtn.getAttribute("data-modal");
    const modal = document.getElementById(id);
    modal?.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  if (closeBtn || overlay) closeAllModals();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeAllModals();
});

// Search + filter
const search = document.getElementById("search");
const filter = document.getElementById("filter");
const list = document.getElementById("projectList");

function apply() {
  const q = (search?.value || "").toLowerCase().trim();
  const f = filter?.value || "all";

  [...list.querySelectorAll(".project")].forEach(p => {
    const tags = (p.getAttribute("data-tags") || "").toLowerCase();
    const text = p.innerText.toLowerCase();
    const matchQ = !q || text.includes(q) || tags.includes(q);
    const matchF = f === "all" || tags.includes(f);
    p.style.display = (matchQ && matchF) ? "flex" : "none";
  });
}
search?.addEventListener("input", apply);
filter?.addEventListener("change", apply);

// Contact form
const form = document.getElementById("form");
const status = document.getElementById("status");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  status.textContent = "Thanks! Please email me directly for fastest response.";
  form.reset();
});
