(() => {
  const nav = document.querySelector(".nav");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  const year = document.getElementById("year");

  if (year) year.textContent = new Date().getFullYear();

  /* Sticky nav style on scroll */
  const onScroll = () => {
    nav?.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile menu */
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  });

  links?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("menu-open");
      toggle?.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  /* Scroll reveal */
  const reveals = document.querySelectorAll(".reveal:not(.hero .reveal)");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* Stagger skill / timeline children slightly */
  document.querySelectorAll(".timeline__item, .skill, .certs__list li").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 5) * 0.08}s`;
  });
})();
