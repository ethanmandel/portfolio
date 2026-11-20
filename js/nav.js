// Every page opens at the top, including when you come back with the Back button.
// Links to a section (like "All work", which goes to #work) still jump to that section.
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
function startAtTop() {
  if (location.hash) return;
  document.documentElement.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  document.documentElement.style.scrollBehavior = "";
}
startAtTop();
addEventListener("pageshow", startAtTop); // also when the browser shows a cached copy on Back
