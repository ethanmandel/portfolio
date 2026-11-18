// Small motion touches shared by every page, after momentoportrait.co. The site works without this file.
document.documentElement.classList.add("js");

(function () {
  // Nav gets a hairline once the page scrolls
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 10); };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Blocks that fade up as they scroll into view
  var selectors = [
    ".section .h2", ".about__body > p", ".project", ".contact .wrap > *",
    ".cs-section > *", ".flow > *", ".steps > div", ".stats > div", ".paths > div",
    ".features > *", ".gallery > *", ".quotes > *", ".takeaways .wrap > *", ".next .wrap"
  ];
  var els = document.querySelectorAll(selectors.join(","));
  els.forEach(function (el) { el.classList.add("reveal"); });

  // Items in a group appear one after another
  document.querySelectorAll(".projects, .steps, .stats, .paths, .features, .gallery, .quotes, .about__body").forEach(function (group) {
    var items = group.querySelectorAll(":scope > .reveal");
    items.forEach(function (el, i) { el.style.setProperty("--delay", (i % 6) * 0.12 + "s"); });
  });

  if (!("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("visible"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  els.forEach(function (el) { io.observe(el); });
})();
