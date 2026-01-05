// Плавный скролл по якорям
document.addEventListener("click", (event) => {
  const target = event.target;
  if (target.matches("a[href^='#'], button[data-scroll]")) {
    const selector = target.getAttribute("href") || target.getAttribute("data-scroll");
    if (!selector || !selector.startsWith("#")) return;

    const section = document.querySelector(selector);
    if (section) {
      event.preventDefault();
      const offset = 70;
      const top = section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }
});

// Мобильное меню
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    header.classList.toggle("nav-open");
  });

  document.addEventListener("click", (e) => {
    if (!header.contains(e.target) && header.classList.contains("nav-open")) {
      header.classList.remove("nav-open");
    }
  });
}

// Фильтрация услуг
const serviceCards = Array.from(document.querySelectorAll(".service-card"));
const serviceTabs = Array.from(document.querySelectorAll(".services-tab"));

function setActiveFilter(filter) {
  serviceTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.filter === filter);
  });

  serviceCards.forEach((card) => {
    const category = card.dataset.category;
    if (filter === "all" || filter === category) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
}

serviceTabs.forEach((tab) => {
  tab.addEventListener("click", () => setActiveFilter(tab.dataset.filter));
});

// Обработка формы (демо)
const form = document.querySelector(".appointment-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.elements.name.value.trim();
    const phone = form.elements.phone.value.trim();

    if (!name || !phone) return;

    alert("Спасибо! Мы свяжемся с вами в ближайшее время для подтверждения записи.");
    form.reset();
  });
}
