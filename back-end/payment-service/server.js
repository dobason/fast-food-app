const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = require('./swagger');
const swaggerSpec = swaggerJsdoc(swaggerOptions);
const paymentRoutes = require('./src/routes/paymentRoutes');

const app = express();

// CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Allow frontend origins
    credentials: true,
}));

app.use(express.json());

// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ Connected to MongoDB - Payment Service'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/payments', paymentRoutes);

app.get('/', (req, res) => {
  res.send('Payment Service is running');
});

// Start server
app.listen(process.env.PORT, () => console.log(`🚀 Payment Service running on port ${process.env.PORT}`));
