const express = require("express");
const router = express.Router();

// Sample user list
router.get("/", (req, res) => {
    res.json([
        { id: 1, name: "User A" },
        { id: 2, name: "User B" }
    ]);
});

module.exports = router;
