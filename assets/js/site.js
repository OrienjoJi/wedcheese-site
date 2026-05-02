document.addEventListener("DOMContentLoaded", () => {
  const yearTargets = document.querySelectorAll("[data-current-year]");
  const currentYear = String(new Date().getFullYear());

  yearTargets.forEach((node) => {
    node.textContent = currentYear;
  });

  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".site-nav__toggle");
  const primaryNav = document.querySelector("#primary-nav");

  function closeMobileNav() {
    if (!header || !navToggle) return;
    header.classList.remove("is-nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("is-mobile-nav-open");
  }

  function closeAllDropdowns() {
    document.querySelectorAll(".nav-dropdown.is-open").forEach((dd) => {
      dd.classList.remove("is-open");
      dd.querySelector(".nav-dropdown__trigger")?.setAttribute("aria-expanded", "false");
    });
  }

  if (header && navToggle && primaryNav) {
    navToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const opening = !header.classList.contains("is-nav-open");
      if (opening) {
        closeAllDropdowns();
        header.classList.add("is-nav-open");
        navToggle.setAttribute("aria-expanded", "true");
        navToggle.setAttribute("aria-label", "Close menu");
        document.body.classList.add("is-mobile-nav-open");
      } else {
        closeMobileNav();
      }
    });

    primaryNav.querySelectorAll("a[data-nav-link]").forEach((link) => {
      link.addEventListener("click", () => closeMobileNav());
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMobileNav();
    });

    document.addEventListener("click", (e) => {
      if (!header.classList.contains("is-nav-open")) return;
      if (!header.contains(e.target)) closeMobileNav();
    });

    window.addEventListener(
      "resize",
      () => {
        if (window.matchMedia("(min-width: 768px)").matches) closeMobileNav();
      },
      { passive: true }
    );
  }

  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const navLinks = document.querySelectorAll("[data-nav-link]");

  navLinks.forEach((link) => {
    const target = link.getAttribute("data-nav-link");
    if (!target) return;
    let isCurrent = path === target;
    if (target === "/blog") {
      isCurrent = path === "/blog" || path.startsWith("/blog/");
    }
    if (isCurrent) {
      link.setAttribute("aria-current", "page");
    }
  });

  const placeholderLinks = document.querySelectorAll("[data-placeholder-link]");
  placeholderLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
    });
  });

  /* Nav dropdown: toggle on click for touch devices */
  document.querySelectorAll(".nav-dropdown__trigger").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const dropdown = btn.closest(".nav-dropdown");
      const isOpen = dropdown.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(isOpen));
    });
  });

  document.addEventListener("click", () => {
    closeAllDropdowns();
  });

  /* ── Screenshot carousel dots ────────────────────── */
  const grid = document.querySelector(".screen-grid");
  const dotsContainer = document.querySelector(".carousel-dots");

  if (grid && dotsContainer) {
    const cards = grid.querySelectorAll(".screen-card");
    if (cards.length) {
      cards.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.className = "dot" + (i === 0 ? " is-active" : "");
        dot.setAttribute("aria-label", `Go to screenshot ${i + 1}`);
        dot.addEventListener("click", () => {
          cards[i].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        });
        dotsContainer.appendChild(dot);
      });

      const dots = dotsContainer.querySelectorAll(".dot");

      const updateDots = () => {
        const gridRect = grid.getBoundingClientRect();
        const center = gridRect.left + gridRect.width / 2;
        let closest = 0;
        let minDist = Infinity;
        cards.forEach((card, i) => {
          const r = card.getBoundingClientRect();
          const dist = Math.abs(r.left + r.width / 2 - center);
          if (dist < minDist) { minDist = dist; closest = i; }
        });
        dots.forEach((d, i) => d.classList.toggle("is-active", i === closest));
      };

      grid.addEventListener("scroll", updateDots, { passive: true });
      window.addEventListener("resize", updateDots, { passive: true });
    }
  }
});
