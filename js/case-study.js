// Highlight the contents link for the section being read
(function () {
  var links = document.querySelectorAll(".toc a");
  if (!links.length || !("IntersectionObserver" in window)) return;
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (a) {
        if (a.getAttribute("href") === "#" + e.target.id) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  document.querySelectorAll(".cs-section").forEach(function (s) { spy.observe(s); });
})();
