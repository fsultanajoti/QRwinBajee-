const express = require("express");
const router = express.Router();

// Dashboard API
router.get("/dashboard", (req, res) => {
    res.json({
        users: 120,
        revenue: 5000,
        activeGames: 3
    });
});

module.exports = router;
