const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = require('./swagger');
const swaggerSpec = swaggerJsdoc(swaggerOptions);
const orderRoutes = require('./src/routes/orderRoutes');

const app = express();
app.use(express.json());

// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ Connected to MongoDB - Order Service'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Order Service is running');
});

app.listen(process.env.PORT, () => console.log(`🚀 Order Service running on port ${process.env.PORT}`));
