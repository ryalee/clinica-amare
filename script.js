const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const siteHeader = document.querySelector(".site-header");

function updateHeaderState() {
  siteHeader?.classList.toggle("scrolled", window.scrollY > 24);
}

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

menuToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Abrir menu");
  });
});

const testimonials = [...document.querySelectorAll(".testimonial")];
const currentCount = document.querySelector(".slider-count strong");
let currentTestimonial = 0;

function showTestimonial(index) {
  currentTestimonial = (index + testimonials.length) % testimonials.length;
  testimonials.forEach((testimonial, testimonialIndex) => {
    testimonial.classList.toggle(
      "active",
      testimonialIndex === currentTestimonial,
    );
  });
  if (currentCount)
    currentCount.textContent = String(currentTestimonial + 1).padStart(2, "0");
}

document
  .querySelector(".prev")
  ?.addEventListener("click", () => showTestimonial(currentTestimonial - 1));
document
  .querySelector(".next")
  ?.addEventListener("click", () => showTestimonial(currentTestimonial + 1));

const testimonialStage = document.querySelector(".testimonial-stage");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
let testimonialTimer;

function startTestimonialRotation() {
  if (prefersReducedMotion || testimonials.length < 2) return;
  clearInterval(testimonialTimer);
  testimonialTimer = setInterval(
    () => showTestimonial(currentTestimonial + 1),
    6500,
  );
}

testimonialStage?.addEventListener("mouseenter", () =>
  clearInterval(testimonialTimer),
);
testimonialStage?.addEventListener("mouseleave", startTestimonialRotation);
testimonialStage?.addEventListener("focusin", () =>
  clearInterval(testimonialTimer),
);
testimonialStage?.addEventListener("focusout", startTestimonialRotation);
startTestimonialRotation();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document
  .querySelectorAll(".reveal")
  .forEach((element) => revealObserver.observe(element));
