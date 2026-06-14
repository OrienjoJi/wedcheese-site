document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".site-nav__toggle");
  const stickyCta = document.querySelector(".mobile-sticky-cta");
  const downloadAnchor = document.querySelector("#download");

  function closeMobileNav() {
    if (!header || !navToggle) return;
    header.classList.remove("is-nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("is-mobile-nav-open");
  }

  document.querySelectorAll('a[href="#download"]').forEach((link) => {
    link.addEventListener("click", () => closeMobileNav());
  });

  if (!stickyCta || !downloadAnchor) return;

  const mobileMq = window.matchMedia("(max-width: 768px)");
  let stickyObserver = null;

  const syncStickyCta = () => {
    if (stickyObserver) {
      stickyObserver.disconnect();
      stickyObserver = null;
    }
    if (mobileMq.matches) {
      stickyObserver = new IntersectionObserver(
        ([entry]) => {
          stickyCta.classList.toggle("is-hidden", entry.isIntersecting);
        },
        { threshold: 0.25, rootMargin: "0px 0px -72px 0px" }
      );
      stickyObserver.observe(downloadAnchor);
    } else {
      stickyCta.classList.remove("is-hidden");
    }
  };

  syncStickyCta();
  mobileMq.addEventListener("change", syncStickyCta);
});
