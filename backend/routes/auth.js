const express = require("express");
const router = express.Router();

// Demo login
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "1234") {
        res.json({ success: true, token: "admin-token" });
    } else {
        res.json({ success: false, message: "Invalid login" });
    }
});

module.exports = router;
