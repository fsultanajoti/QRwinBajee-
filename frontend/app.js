// 🎧 SOUND SYSTEM
const Sound = {
  spin: document.getElementById("spinSound"),
  win: document.getElementById("winSound"),
  jackpot: document.getElementById("jackpotSound"),
  click: document.getElementById("clickSound"),
  bg: document.getElementById("bgMusic")
};

// 🔓 AUDIO UNLOCK (mobile fix)
let audioUnlocked = false;

function unlockAudio() {
  if (audioUnlocked) return;

  Object.values(Sound).forEach((s) => {
    if (s) {
      s.play().then(() => {
        s.pause();
        s.currentTime = 0;
      }).catch(() => {});
    }
  });

  audioUnlocked = true;
}

// 🔊 SAFE PLAY
function play(sound) {
  if (!sound) return;

  try {
    sound.currentTime = 0;
    sound.volume = 0.4;
    sound.play().catch(() => {});
  } catch (e) {
    console.log("Sound error:", e);
  }
}

// 🎰 WEIGHTED SLOT SYSTEM (REAL CASINO STYLE)
const SYMBOLS = [
  { s: "🍒", w: 30 },
  { s: "🍋", w: 25 },
  { s: "🔔", w: 20 },
  { s: "🍉", w: 15 },
  { s: "7️⃣", w: 8 },
  { s: "💎", w: 2 }
];

function weightedSymbol() {
  const total = SYMBOLS.reduce((a, b) => a + b.w, 0);
  let r = Math.random() * total;

  for (let item of SYMBOLS) {
    if (r < item.w) return item.s;
    r -= item.w;
  }

  return "🍒";
}

// 🎰 GENERATE REELS
function generateReels() {
  return [
    weightedSymbol(),
    weightedSymbol(),
    weightedSymbol()
  ];
}

// 📦 COMPONENT LOADER (NAVBAR + FOOTER)
function loadComponents() {
  const navbar = document.getElementById("navbar");
  const footer = document.getElementById("footer");

  if (navbar) {
    fetch("../components/navbar.html")
      .then(r => r.text())
      .then(data => {
        navbar.innerHTML = data;
      });
  }

  if (footer) {
    fetch("../components/footer.html")
      .then(r => r.text())
      .then(data => {
        footer.innerHTML = data;
      });
  }
}

// 🚀 INIT ON PAGE LOAD
window.addEventListener("load", () => {
  loadComponents();
});
