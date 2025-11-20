const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = require('./swagger');
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

const restaurantRoutes = require('./src/routes/restaurantRoutes');

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB - Restaurant Service"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use('/api/restaurant', restaurantRoutes);

app.get("/", (req, res) => {
    res.send("Restaurant Service is running");
})

app.listen(process.env.PORT, () => {
    console.log(`🚀 Restaurant Service running on port ${process.env.PORT}`);
});