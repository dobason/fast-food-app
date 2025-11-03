const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Import route từ thư mục src/routes
const userRoutes = require("./src/routes/userRoutes")

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/users")
    .then(() => console.log("✅ Connected to MongoDB - User Service"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// Gắn router
app.use("/api/users", userRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("User Service is running 🚀");
});

// Chạy server
app.listen(5001, () => {
    console.log("🚀 User Service running on port 5001");
});
