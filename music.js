const audio = document.createElement("audio");
audio.preload = "metadata";

const player = document.querySelector(".music-player");
const playButton = player.querySelector("[data-music-play]");
const previousButton = player.querySelector("[data-music-previous]");
const nextButton = player.querySelector("[data-music-next]");
const seek = player.querySelector("[data-music-seek]");
const volumeButton = player.querySelector("[data-music-volume]");
const volumePanel = player.querySelector(".volume-panel");
const volumeSlider = player.querySelector("[data-music-volume-slider]");
const menuButton = player.querySelector("[data-music-menu]");
const musicMenu = player.querySelector(".music-menu");
const trackLabel = player.querySelector(".music-track");
const tracks = typeof MUSIC_TRACKS === "undefined" ? [] : MUSIC_TRACKS;
const MUSIC_STATE_KEY = "music-player-state";
let savedState = {};
try {
  savedState = JSON.parse(localStorage.getItem(MUSIC_STATE_KEY) || "{}");
} catch (e) {
  savedState = {};
}
let trackIndex = Number.isInteger(savedState.trackIndex) ? savedState.trackIndex : -1;
let resumeAfterLoad = savedState.playing === true;

if (tracks.length > 0) {
  if (trackIndex < 0 || trackIndex >= tracks.length) {
    trackIndex = Math.floor(Math.random() * tracks.length);
  }
}

function randomTrackIndex() {
  if (tracks.length < 2) return trackIndex;
  let nextIndex = trackIndex;
  while (nextIndex === trackIndex) {
    nextIndex = Math.floor(Math.random() * tracks.length);
  }
  return nextIndex;
}

function saveMusicState() {
  try {
    localStorage.setItem(MUSIC_STATE_KEY, JSON.stringify({
      trackIndex,
      currentTime: audio.currentTime || 0,
      volume: audio.volume,
      playing: !audio.paused,
    }));
  } catch (e) {
    // Keep playback working if storage is unavailable.
  }
}

function updatePlayer() {
  const hasTracks = tracks.length > 0;
  player.classList.toggle("has-track", hasTracks);
  player.classList.toggle("empty", !hasTracks);
  playButton.disabled = !hasTracks;
  previousButton.disabled = !hasTracks;
  nextButton.disabled = !hasTracks;
  seek.disabled = !hasTracks;
  if (!hasTracks) {
    trackLabel.textContent = "No music added";
    return;
  }
  trackLabel.textContent = tracks[trackIndex].title;
  audio.src = tracks[trackIndex].url;
  updateMusicMenu();
}

function updateMusicMenu() {
  musicMenu.innerHTML = "";
  tracks.forEach((track, index) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "music-menu-item" + (index === trackIndex ? " active" : "");
    item.textContent = track.title;
    item.addEventListener("click", () => {
      loadTrack(index, true);
      musicMenu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
    musicMenu.appendChild(item);
  });
}

function loadTrack(index, shouldPlay) {
  trackIndex = (index + tracks.length) % tracks.length;
  savedState.currentTime = 0;
  resumeAfterLoad = shouldPlay;
  updatePlayer();
  audio.load();
  saveMusicState();
}

playButton.addEventListener("click", () => {
  if (!tracks.length) return;
  if (audio.paused) audio.play();
  else audio.pause();
});

previousButton.addEventListener("click", () => loadTrack(randomTrackIndex(), true));
nextButton.addEventListener("click", () => loadTrack(randomTrackIndex(), true));
audio.addEventListener("play", () => {
  playButton.textContent = "⏸";
  saveMusicState();
});
audio.addEventListener("pause", () => {
  playButton.textContent = "▶";
  saveMusicState();
});
audio.addEventListener("ended", () => loadTrack(randomTrackIndex(), true));
audio.addEventListener("loadedmetadata", () => {
  seek.max = audio.duration || 0;
  if (Number.isFinite(savedState.currentTime)) {
    audio.currentTime = Math.min(savedState.currentTime, audio.duration || savedState.currentTime);
  }
  if (resumeAfterLoad) {
    audio.play().catch(() => {
      resumeAfterLoad = false;
    });
  }
});
audio.addEventListener("timeupdate", () => {
  seek.value = audio.currentTime;
  saveMusicState();
});
seek.addEventListener("input", () => { audio.currentTime = seek.value; });

volumeButton.addEventListener("click", () => {
  const open = volumePanel.classList.toggle("open");
  volumeButton.setAttribute("aria-expanded", String(open));
});

menuButton.addEventListener("click", () => {
  const open = musicMenu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

volumeSlider.addEventListener("input", () => { audio.volume = volumeSlider.value; });
volumeSlider.value = Number.isFinite(savedState.volume) ? savedState.volume : "0.05";
audio.volume = Number(volumeSlider.value);
window.addEventListener("beforeunload", saveMusicState);
updatePlayer();