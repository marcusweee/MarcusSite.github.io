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

const petalTrailField = document.createElement("div");
petalTrailField.className = "petal-trail-field";
petalTrailField.setAttribute("aria-hidden", "true");
document.body.appendChild(petalTrailField);

const clickRippleField = document.createElement("div");
clickRippleField.className = "click-ripple-field";
clickRippleField.setAttribute("aria-hidden", "true");
document.body.appendChild(clickRippleField);

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const effectsButton = document.querySelector(".effects-button");
const effectsMenu = document.querySelector(".effects-menu");
const fallingPetalsOption = document.querySelector("[data-effect='falling-petals']");
const petalTrailOption = document.querySelector("[data-effect='petal-trail']");
const gridParallaxOption = document.querySelector("[data-effect='grid-parallax']");
const clickRippleOption = document.querySelector("[data-effect='click-ripple']");
let effectsState = {};
try {
  effectsState = JSON.parse(localStorage.getItem("effects-state") || "{}");
} catch (e) {
  effectsState = {};
}

const fallingPetalsEnabled = effectsState.fallingPetals ?? localStorage.getItem("petals-disabled") !== "true";
let petalTrailEnabled = effectsState.petalTrail === true;
let gridParallaxEnabled = effectsState.gridParallax !== false;
let clickRippleEnabled = effectsState.clickRipple === true;

function saveEffectsState() {
  try {
    localStorage.setItem("effects-state", JSON.stringify({
      fallingPetals: fallingPetalsOption.checked,
      petalTrail: petalTrailOption.checked,
      gridParallax: gridParallaxOption.checked,
      clickRipple: clickRippleOption.checked,
    }));
  } catch (e) {
    // Keep effect controls working if storage is unavailable.
  }
}

function updateEffects() {
  document.body.classList.toggle("falling-petals-off", !fallingPetalsOption.checked);
  petalTrailEnabled = petalTrailOption.checked;
  gridParallaxEnabled = gridParallaxOption.checked;
  clickRippleEnabled = clickRippleOption.checked;
  if (!gridParallaxEnabled) {
    document.body.style.setProperty("--grid-x", "0px");
    document.body.style.setProperty("--grid-y", "0px");
  }
}

fallingPetalsOption.checked = fallingPetalsEnabled;
petalTrailOption.checked = petalTrailEnabled;
gridParallaxOption.checked = gridParallaxEnabled;
clickRippleOption.checked = clickRippleEnabled;
updateEffects();

effectsButton.addEventListener("click", () => {
  const open = effectsMenu.classList.toggle("open");
  effectsButton.setAttribute("aria-expanded", String(open));
});

[fallingPetalsOption, petalTrailOption, gridParallaxOption, clickRippleOption].forEach((option) => {
  option.addEventListener("change", () => {
    updateEffects();
    saveEffectsState();
  });
});

if (!reducedMotion.matches) {
  let lastTrailTime = 0;
  window.addEventListener("click", (event) => {
    if (!clickRippleEnabled) return;
    const ripple = document.createElement("span");
    ripple.className = "click-ripple";
    ripple.style.left = event.clientX + "px";
    ripple.style.top = event.clientY + "px";
    clickRippleField.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  });

  window.addEventListener("mousemove", (event) => {
    const horizontalShift = ((event.clientX / window.innerWidth) - 0.5) * 14;
    const verticalShift = ((event.clientY / window.innerHeight) - 0.5) * 14;
    if (gridParallaxEnabled) {
      document.body.style.setProperty("--grid-x", horizontalShift.toFixed(2) + "px");
      document.body.style.setProperty("--grid-y", verticalShift.toFixed(2) + "px");
    }

    if (petalTrailEnabled && event.timeStamp - lastTrailTime > 55) {
      const petal = document.createElement("span");
      petal.className = "cursor-petal";
      petal.style.left = event.clientX + "px";
      petal.style.top = event.clientY + "px";
      petal.style.setProperty("--trail-drift", (Math.random() * 34 - 17).toFixed(0) + "px");
      petal.style.transform = "translate(-50%, -50%) rotate(" + (Math.random() * 360).toFixed(0) + "deg)";
      petalTrailField.appendChild(petal);
      petal.addEventListener("animationend", () => petal.remove());
      lastTrailTime = event.timeStamp;
    }
  });

  window.addEventListener("mouseleave", () => {
    document.body.style.setProperty("--grid-x", "0px");
    document.body.style.setProperty("--grid-y", "0px");
  });
}

