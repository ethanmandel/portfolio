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

// Remembra: onboarding screens you scroll through, with dots that follow along
document.querySelectorAll("[data-swipe]").forEach(function (box) {
  var track = box.querySelector(".mock-swipe__track");
  var slides = track.querySelectorAll(".mock-swipe__slide");
  var dots = box.querySelector(".mock-swipe__dots");
  slides.forEach(function (slide, i) {
    var dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", "Step " + (i + 1) + ": " + slide.querySelector("span").textContent);
    dot.addEventListener("click", function () { go(i); });
    dots.appendChild(dot);
  });
  function go(i) {
    var s = slides[i];
    track.scrollTo({ left: s.offsetLeft - (track.clientWidth - s.clientWidth) / 2, behavior: "smooth" });
  }
  // the slide closest to the middle of the track is the current one
  function update() {
    var mid = track.scrollLeft + track.clientWidth / 2, best = 0, bestDist = Infinity;
    slides.forEach(function (s, i) {
      var d = Math.abs(s.offsetLeft + s.clientWidth / 2 - mid);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    slides.forEach(function (s, i) { s.classList.toggle("is-active", i === best); });
    dots.querySelectorAll("button").forEach(function (d, i) {
      if (i === best) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current");
    });
  }
  // clicking a dimmed phone brings it to the middle
  slides.forEach(function (s, i) { s.addEventListener("click", function () { go(i); }); });
  track.addEventListener("scroll", function () { window.requestAnimationFrame(update); }, { passive: true });
  window.addEventListener("resize", update);
  update();
});

// Remembra: one phone flipping between the memory game's states.
// It steps through on its own while on screen, and stops once someone picks a state.
document.querySelectorAll("[data-states]").forEach(function (box) {
  var imgs = box.querySelectorAll("img[data-state]");
  var btns = box.querySelectorAll("button[data-to]");
  var current = 0, timer = null;
  function show(i) {
    current = i;
    imgs.forEach(function (im) { im.classList.toggle("is-on", +im.dataset.state === i); });
    btns.forEach(function (b) { b.setAttribute("aria-pressed", +b.dataset.to === i ? "true" : "false"); });
  }
  btns.forEach(function (b) {
    b.addEventListener("click", function () { stop(); show(+b.dataset.to); });
  });
  function stop() { clearInterval(timer); timer = null; box.dataset.manual = "1"; }
  show(0);
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;
  new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (box.dataset.manual) return;
      if (e.isIntersecting && !timer) timer = setInterval(function () { show((current + 1) % imgs.length); }, 2400);
      if (!e.isIntersecting && timer) { clearInterval(timer); timer = null; }
    });
  }, { threshold: .5 }).observe(box);
});

// Laguna: one MacBook that switches between pages, and between the original site and the redesign
document.querySelectorAll("[data-compare]").forEach(function (box) {
  var imgs = box.querySelectorAll(".compare__screen img");
  var pageBtns = box.querySelectorAll(".compare__pages button");
  var whenBtns = box.querySelectorAll(".compare__when button");
  var page = "0", when = "after";
  function show() {
    imgs.forEach(function (im) { im.classList.toggle("is-on", im.dataset.page === page && im.dataset.when === when); });
    pageBtns.forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.page === page ? "true" : "false"); });
    whenBtns.forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.when === when ? "true" : "false"); });
  }
  pageBtns.forEach(function (b) { b.addEventListener("click", function () { page = b.dataset.page; show(); }); });
  whenBtns.forEach(function (b) { b.addEventListener("click", function () { when = b.dataset.when; show(); }); });
  show();
});
