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

// 🎯 CHECK WIN LOGIC
function checkWin(r) {
  if (r[0] === r[1] && r[1] === r[2]) {
    if (r[0] === "💎") return "JACKPOT";
    return "BIG_WIN";
  }

  if (r[0] === r[1] || r[1] === r[2] || r[0] === r[2]) {
    return "SMALL_WIN";
  }

  return "LOSE";
}

// 🎰 SPIN FUNCTION (MAIN ENGINE)
let spinning = false;

function spin() {
  if (spinning) return;
  spinning = true;

  unlockAudio();
  play(Sound.spin);

  let count = 0;

  // fake animation effect (fast spin)
  const interval = setInterval(() => {
    document.querySelectorAll(".reel").forEach((el) => {
      el.innerText = weightedSymbol();
    });

    count++;
    if (count > 12) clearInterval(interval);
  }, 80);

  // stop spin
  setTimeout(() => {
    const result = generateReels();

    const reels = document.querySelectorAll(".reel");
    reels[0].innerText = result[0];
    reels[1].innerText = result[1];
    reels[2].innerText = result[2];

    const outcome = checkWin(result);

    const resultText = document.getElementById("result");
    const balanceEl = document.getElementById("balance");

    let balance = parseInt(balanceEl.innerText);

    if (outcome === "JACKPOT") {
      resultText.innerText = "💎 JACKPOT WIN!";
      play(Sound.jackpot);
      balance += 2000;
    } 
    else if (outcome === "BIG_WIN") {
      resultText.innerText = "🔥 BIG WIN!";
      play(Sound.win);
      balance += 300;
    } 
    else if (outcome === "SMALL_WIN") {
      resultText.innerText = "✨ SMALL WIN";
      play(Sound.win);
      balance += 100;
    } 
    else {
      resultText.innerText = "❌ LOSE";
      balance -= 50;
    }

    balanceEl.innerText = balance;

    spinning = false;
  }, 1500);
}

// 🎵 START MUSIC
function startMusic() {
  if (Sound.bg) {
    Sound.bg.loop = true;
    Sound.bg.volume = 0.3;
    Sound.bg.play().catch(() => {});
  }
}

// 📱 FIRST TOUCH UNLOCK
document.addEventListener("click", () => {
  unlockAudio();
  startMusic();
}, { once: true });
