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
let hasHeaderAppeared = false;
const scrollKeys = new Set(["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "]);

const preventIntroScroll = (event) => {
  if (!document.body.classList.contains("is-intro-active")) {
    return;
  }

  if (event.cancelable) {
    event.preventDefault();
  }
};

const preventIntroKeyboardScroll = (event) => {
  if (scrollKeys.has(event.key)) {
    preventIntroScroll(event);
  }
};

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
    document.body.classList.remove("is-intro-active");
  }, hideIntro);
});

const updateHeaderState = () => {
  if (window.scrollY > 0 || hasHeaderAppeared) {
    hasHeaderAppeared = true;
    header.classList.add("is-visible");
  }
};

const setActiveNav = (sectionId) => {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.section === sectionId);
  });
};

const updateActiveSection = () => {
  const viewportHeight = window.innerHeight;
  let activeSectionId = "";

  document.querySelectorAll(".page-section[id]").forEach((section) => {
    const rect = section.getBoundingClientRect();
    const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
    const viewportCoverage = Math.max(0, visibleHeight) / viewportHeight;

    if (viewportCoverage >= 0.75) {
      activeSectionId = section.id;
    }
  });

  if (activeSectionId) {
    setActiveNav(activeSectionId);
  }
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

window.addEventListener("wheel", preventIntroScroll, { passive: false });
window.addEventListener("touchmove", preventIntroScroll, { passive: false });
window.addEventListener("keydown", preventIntroKeyboardScroll);
window.addEventListener("scroll", updateHeaderState, { passive: true });
window.addEventListener("scroll", updateActiveSection, { passive: true });
window.addEventListener("resize", updateHeaderState);
window.addEventListener("resize", updateActiveSection);
updateHeaderState();
updateActiveSection();
