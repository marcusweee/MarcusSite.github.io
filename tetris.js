const gameSelection = document.getElementById("game-selection");
const tetrisGame = document.getElementById("tetris-game");
const leaderboardPanel = document.getElementById("leaderboard-panel");
const boardCanvas = document.getElementById("tetris-board");
const nextCanvas = document.getElementById("tetris-next");
const holdCanvas = document.getElementById("tetris-hold");
const boardContext = boardCanvas.getContext("2d");
const nextContext = nextCanvas.getContext("2d");
const holdContext = holdCanvas.getContext("2d");
const scoreElement = document.getElementById("tetris-score");
const levelElement = document.getElementById("tetris-level");
const linesElement = document.getElementById("tetris-lines");
const overlay = document.getElementById("tetris-overlay");
const leaderboardList = document.getElementById("tetris-leaderboard");
const sideLeaderboardList = document.getElementById("tetris-side-leaderboard");

const columns = 10;
const rows = 20;
const cellSize = 30;
const leaderboardKey = "semester-tetris-leaderboard";
const colors = ["#d39abf", "#a78bbd", "#8bb7ad", "#d5b37a", "#c9849d", "#8fa9c9", "#b5a1d1"];
const pieces = [
  [[1, 1, 1, 1]],
  [[1, 1], [1, 1]],
  [[0, 1, 0], [1, 1, 1]],
  [[1, 0, 0], [1, 1, 1]],
  [[0, 0, 1], [1, 1, 1]],
  [[0, 1, 1], [1, 1, 0]],
  [[1, 1, 0], [0, 1, 1]],
];

let board;
let activePiece;
let nextPiece;
let heldPiece;
let holdUsed;
let score = 0;
let level = 1;
let lines = 0;
let dropTimer = 0;
let lastFrame = 0;
let animationFrame;
let gameRunning = false;
let gameStartedAt = 0;

function makeBoard() {
  return Array.from({ length: rows }, () => Array(columns).fill(0));
}

function randomPiece() {
  const shape = pieces[Math.floor(Math.random() * pieces.length)].map((row) => [...row]);
  return { shape, color: Math.floor(Math.random() * colors.length), x: Math.floor((columns - shape[0].length) / 2), y: 0 };
}

function rotatePiece(shape) {
  return shape[0].map((_, column) => shape.map((row) => row[column]).reverse());
}

function collides(piece, offsetX = 0, offsetY = 0, shape = piece.shape) {
  return shape.some((row, y) => row.some((cell, x) => {
    if (!cell) return false;
    const boardX = piece.x + x + offsetX;
    const boardY = piece.y + y + offsetY;
    return boardX < 0 || boardX >= columns || boardY >= rows || (boardY >= 0 && board[boardY][boardX]);
  }));
}

function drawCell(context, x, y, color, size = cellSize) {
  context.fillStyle = colors[color];
  context.fillRect(x * size + 1, y * size + 1, size - 2, size - 2);
  context.fillStyle = "rgba(255, 255, 255, 0.12)";
  context.fillRect(x * size + 3, y * size + 3, size - 8, 3);
}

function draw() {
  boardContext.clearRect(0, 0, boardCanvas.width, boardCanvas.height);
  boardContext.fillStyle = "rgba(18, 10, 22, 0.7)";
  boardContext.fillRect(0, 0, boardCanvas.width, boardCanvas.height);
  boardContext.strokeStyle = "rgba(238, 219, 237, 0.08)";
  for (let x = 0; x <= columns; x++) {
    boardContext.beginPath(); boardContext.moveTo(x * cellSize, 0); boardContext.lineTo(x * cellSize, boardCanvas.height); boardContext.stroke();
  }
  for (let y = 0; y <= rows; y++) {
    boardContext.beginPath(); boardContext.moveTo(0, y * cellSize); boardContext.lineTo(boardCanvas.width, y * cellSize); boardContext.stroke();
  }
  board.forEach((row, y) => row.forEach((cell, x) => { if (cell) drawCell(boardContext, x, y, cell - 1); }));
  if (activePiece) activePiece.shape.forEach((row, y) => row.forEach((cell, x) => { if (cell) drawCell(boardContext, activePiece.x + x, activePiece.y + y, activePiece.color); }));

  nextContext.clearRect(0, 0, nextCanvas.width, nextCanvas.height);
  if (nextPiece) {
    const size = 22;
    const offsetX = (nextCanvas.width / size - nextPiece.shape[0].length) / 2;
    const offsetY = (nextCanvas.height / size - nextPiece.shape.length) / 2;
    nextPiece.shape.forEach((row, y) => row.forEach((cell, x) => { if (cell) drawCell(nextContext, offsetX + x, offsetY + y, nextPiece.color, size); }));
  }

  holdContext.clearRect(0, 0, holdCanvas.width, holdCanvas.height);
  if (heldPiece) {
    const size = 22;
    const offsetX = (holdCanvas.width / size - heldPiece.shape[0].length) / 2;
    const offsetY = (holdCanvas.height / size - heldPiece.shape.length) / 2;
    heldPiece.shape.forEach((row, y) => row.forEach((cell, x) => { if (cell) drawCell(holdContext, offsetX + x, offsetY + y, heldPiece.color, size); }));
  }
}

function updateStats() {
  scoreElement.textContent = score.toLocaleString();
  levelElement.textContent = level;
  linesElement.textContent = lines;
}

function lockPiece() {
  activePiece.shape.forEach((row, y) => row.forEach((cell, x) => {
    if (cell && activePiece.y + y >= 0) board[activePiece.y + y][activePiece.x + x] = activePiece.color + 1;
  }));
  const cleared = board.reduce((count, row, y) => row.every(Boolean) ? count + 1 : count, 0);
  if (cleared) {
    board = board.filter((row) => !row.every(Boolean));
    while (board.length < rows) board.unshift(Array(columns).fill(0));
    const points = [0, 100, 300, 500, 800][cleared] * level;
    score += points;
    lines += cleared;
    level = Math.floor(lines / 5) + 1;
    updateStats();
  }
  activePiece = nextPiece;
  resetPiece(activePiece);
  holdUsed = false;
  nextPiece = randomPiece();
  if (collides(activePiece)) endGame();
}

function drop() {
  if (!collides(activePiece, 0, 1)) activePiece.y++;
  else lockPiece();
  dropTimer = 0;
}

function hardDrop() {
  let distance = 0;
  while (!collides(activePiece, 0, distance + 1)) distance++;
  activePiece.y += distance;
  score += distance * 2;
  updateStats();
  lockPiece();
}

function move(direction) {
  if (!collides(activePiece, direction, 0)) activePiece.x += direction;
}

function rotate() {
  const rotated = rotatePiece(activePiece.shape);
  if (!collides(activePiece, 0, 0, rotated)) activePiece.shape = rotated;
}

function counterRotate() {
  rotate();
  rotate();
  rotate();
}

function resetPiece(piece) {
  piece.x = Math.floor((columns - piece.shape[0].length) / 2);
  piece.y = 0;
}

function hold() {
  if (holdUsed) return;
  const currentPiece = activePiece;
  if (heldPiece) {
    activePiece = heldPiece;
    resetPiece(activePiece);
  } else {
    activePiece = nextPiece;
    resetPiece(activePiece);
    nextPiece = randomPiece();
  }
  heldPiece = currentPiece;
  resetPiece(heldPiece);
  holdUsed = true;
}

function loop(timestamp = 0) {
  if (!gameRunning) return;
  const delta = timestamp - lastFrame;
  lastFrame = timestamp;
  dropTimer += delta;
  const interval = Math.max(180, 700 / (1 + (level - 1) / 19));
  if (dropTimer >= interval) drop();
  draw();
  animationFrame = requestAnimationFrame(loop);
}

function startGame() {
  cancelAnimationFrame(animationFrame);
  board = makeBoard();
  score = 0; level = 1; lines = 0; dropTimer = 0;
  activePiece = randomPiece();
  nextPiece = randomPiece();
  heldPiece = null;
  holdUsed = false;
  gameRunning = true;
  gameStartedAt = performance.now();
  overlay.hidden = true;
  updateStats();
  lastFrame = performance.now();
  animationFrame = requestAnimationFrame(loop);
}

function readScores() {
  try { return JSON.parse(localStorage.getItem(leaderboardKey) || "[]"); } catch (error) { return []; }
}

function renderLeaderboardInto(list) {
  list.innerHTML = "";
  const scores = readScores();
  if (!scores.length) {
    list.innerHTML = "<li class=\"leaderboard-empty\">No scores yet.</li>";
    return;
  }
  scores.slice(0, 10).forEach((entry, index) => {
    const item = document.createElement("li");
    item.innerHTML = `<span class="rank">${index + 1}</span><span class="player-name">${entry.name}</span><strong>${entry.score.toLocaleString()}</strong><small>Lv. ${entry.level} · ${formatPlayTime(entry.playTimeSeconds)}</small>`;
    list.appendChild(item);
  });
}

function formatPlayTime(seconds) {
  const minutes = Math.floor((seconds || 0) / 60);
  const remainingSeconds = Math.floor((seconds || 0) % 60);
  return minutes + "m " + String(remainingSeconds).padStart(2, "0") + "s";
}

function renderLeaderboard() {
  renderLeaderboardInto(leaderboardList);
  renderLeaderboardInto(sideLeaderboardList);
}

function endGame() {
  gameRunning = false;
  cancelAnimationFrame(animationFrame);
  overlay.hidden = false;
  overlay.querySelector("strong").textContent = "Game over";
  overlay.querySelector("button").textContent = "Play again";
  let name = "";
  try {
    name = window.prompt("Enter your name for the leaderboard (5 characters max):", "") || "";
  } catch (error) {
    name = "";
  }
  const cleanName = (name || "Anon").trim().slice(0, 5) || "Anon";
  const playTimeSeconds = Math.max(0, (performance.now() - gameStartedAt) / 1000);
  const scores = readScores();
  const existing = scores.find((entry) => entry.name.toLowerCase() === cleanName.toLowerCase());
  if (existing) {
    existing.playTimeSeconds = (existing.playTimeSeconds || 0) + playTimeSeconds;
    existing.score = Math.max(existing.score, score);
    existing.level = Math.max(existing.level, level);
    existing.lines = Math.max(existing.lines, lines);
    existing.name = cleanName;
  } else {
    scores.push({ name: cleanName, score, level, lines, playTimeSeconds, date: new Date().toISOString() });
  }
  scores.sort((a, b) => b.score - a.score);
  try { localStorage.setItem(leaderboardKey, JSON.stringify(scores.slice(0, 50))); } catch (error) { /* Local save unavailable. */ }
  renderLeaderboard();
}

document.addEventListener("keydown", (event) => {
  if (!gameRunning) return;
  if (["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", " ", "Shift", "z", "Z"].includes(event.key)) event.preventDefault();
  if (event.key === "ArrowLeft") move(-1);
  if (event.key === "ArrowRight") move(1);
  if (event.key === "ArrowDown") drop();
  if (event.key === "ArrowUp") rotate();
  if (event.key === "z" || event.key === "Z") counterRotate();
  if (event.key === "Shift") hold();
  if (event.key === " ") hardDrop();
});

document.querySelectorAll("[data-tetris-control]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!gameRunning) return;
    const control = button.dataset.tetrisControl;
    if (control === "left") move(-1);
    if (control === "right") move(1);
    if (control === "down") drop();
    if (control === "rotate") rotate();
    if (control === "counter-rotate") counterRotate();
    if (control === "hold") hold();
    if (control === "hard-drop") hardDrop();
  });
});

document.querySelector("[data-start-tetris]").addEventListener("click", () => {
  gameSelection.hidden = true;
  leaderboardPanel.hidden = true;
  tetrisGame.hidden = false;
  startGame();
});
document.querySelector("[data-play-tetris]").addEventListener("click", startGame);
document.querySelector("[data-restart-tetris]").addEventListener("click", startGame);
document.querySelector("[data-back-games]").addEventListener("click", () => { tetrisGame.hidden = true; gameSelection.hidden = false; });
document.querySelectorAll("[data-show-leaderboard]").forEach((button) => {
  button.addEventListener("click", () => { gameSelection.hidden = true; tetrisGame.hidden = true; leaderboardPanel.hidden = false; renderLeaderboard(); });
});
document.querySelector("[data-hide-leaderboard]").addEventListener("click", () => { leaderboardPanel.hidden = true; gameSelection.hidden = false; });

renderLeaderboard();
