
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = require('./swagger');
require('dotenv').config();

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const app = express();

// CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Allow frontend origins
    credentials: true,
}));

app.use(express.json());

// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Import route từ thư mục src/routes
const userRoutes = require("./src/routes/userRoutes")

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("✅ Connected to MongoDB - User Service"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// Gắn router
app.use("/api/users", userRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("User Service is running 🚀");
});

// Chạy server
app.listen(process.env.PORT, () => {
    console.log(`🚀 User Service running on port ${process.env.PORT}`);
});
