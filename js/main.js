const intro = document.querySelector(".intro");
const hero = document.querySelector(".hero");
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".site-header__toggle");
const navLinks = document.querySelectorAll(".site-header__link");
const heroScroll = document.querySelector(".hero__scroll");
const brandSection = document.querySelector(".brand-section");
const firstSentence = document.querySelector(".intro__sentence--first");
const secondSentence = document.querySelector(".intro__sentence--second");

const showFirstSentence = 200;
const showSecondSentence = 800;
const fadeOutIntro = 4000;
const hideIntro = 5000;

window.addEventListener("DOMContentLoaded", () => {
  window.setTimeout(() => {
    firstSentence.classList.add("is-visible");
  }, showFirstSentence);

  window.setTimeout(() => {
    secondSentence.classList.add("is-visible");
  }, showSecondSentence);

  window.setTimeout(() => {
    intro.classList.add("is-fading-out");
    hero.classList.add("is-visible");
  }, fadeOutIntro);

  window.setTimeout(() => {
    intro.classList.add("is-hidden");
  }, hideIntro);
});

const updateHeaderState = () => {
  const heroBottom = hero.getBoundingClientRect().bottom;

  if (heroBottom <= 0) {
    header.classList.add("is-visible");
  } else {
    header.classList.remove("is-visible", "is-menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
};

const setActiveNav = (sectionId) => {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.section === sectionId);
  });
};

menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
    header.classList.remove("is-menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

heroScroll.addEventListener("click", () => {
  brandSection.scrollIntoView({ behavior: "smooth" });
});

const brandObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      brandSection.classList.add("is-visible");
    }
  });
}, { threshold: 0.28 });

brandObserver.observe(brandSection);

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setActiveNav(entry.target.id);
    }
  });
}, {
  rootMargin: "-45% 0px -45% 0px",
  threshold: 0,
});

document.querySelectorAll(".page-section[id]").forEach((section) => {
  sectionObserver.observe(section);
});

window.addEventListener("scroll", updateHeaderState, { passive: true });
window.addEventListener("resize", updateHeaderState);
updateHeaderState();
