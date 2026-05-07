const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
    res.send("QrWinBajee Backend Running 🚀");
});

const PORT = 6700;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
