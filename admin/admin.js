function login() {
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;

  if (u === "admin" && p === "1234") {
    window.location.href = "dashboard.html";
  } else {
    alert("❌ Wrong credentials");
  }
}

function saveSettings() {
  alert("✅ Settings saved (demo)");
}
