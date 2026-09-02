const petalField = document.createElement("div");
petalField.className = "petal-field";
petalField.setAttribute("aria-hidden", "true");

for (let i = 0; i < 24; i++) {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.style.left = Math.random() * 100 + "%";
  petal.style.setProperty("--drift", (Math.random() * 180 - 90).toFixed(0) + "px");
  petal.style.setProperty("--start-rotation", (Math.random() * 360).toFixed(0) + "deg");
  petal.style.setProperty("--fall-time", (16 + Math.random() * 16).toFixed(2) + "s");
  petal.style.setProperty("--fall-delay", (-Math.random() * 30).toFixed(2) + "s");
  petal.style.setProperty("--sway-time", (3 + Math.random() * 3).toFixed(2) + "s");
  petalField.appendChild(petal);
}

document.body.appendChild(petalField);

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!reducedMotion.matches) {
  window.addEventListener("mousemove", (event) => {
    const horizontalShift = ((event.clientX / window.innerWidth) - 0.5) * 14;
    const verticalShift = ((event.clientY / window.innerHeight) - 0.5) * 14;
    document.body.style.setProperty("--grid-x", horizontalShift.toFixed(2) + "px");
    document.body.style.setProperty("--grid-y", verticalShift.toFixed(2) + "px");
  });

  window.addEventListener("mouseleave", () => {
    document.body.style.setProperty("--grid-x", "0px");
    document.body.style.setProperty("--grid-y", "0px");
  });
}

const animationToggle = document.querySelector(".animation-toggle");
let animationsDisabled = false;

try {
  animationsDisabled = localStorage.getItem("petals-disabled") === "true";
} catch (e) {
  // Local storage may be unavailable in privacy-restricted browsers.
}

function updateAnimationToggle() {
  document.body.classList.toggle("animations-off", animationsDisabled);
  if (!animationToggle) return;
  animationToggle.setAttribute("aria-pressed", String(animationsDisabled));
  animationToggle.textContent = animationsDisabled ? "Enable petals" : "Pause petals";
}

updateAnimationToggle();

animationToggle?.addEventListener("click", () => {
  animationsDisabled = !animationsDisabled;
  try {
    localStorage.setItem("petals-disabled", String(animationsDisabled));
  } catch (e) {
    // Keep the toggle working for this page if storage is unavailable.
  }
  updateAnimationToggle();
});
