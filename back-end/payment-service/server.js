const express = require('express');
const mongoose = require('mongoose');
const paymentRoutes = require('./src/routes/paymentRoutes');

const app = express();
app.use(express.json());

// Kết nối MongoDB
mongoose.connect('mongodb://mongodb:27017/payments')
  .then(() => console.log('✅ Connected to MongoDB - Payment Service'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/payments', paymentRoutes);

app.get('/', (req, res) => {
  res.send('Payment Service is running');
});

// Start server
app.listen(5004, () => console.log('🚀 Payment Service running on port 5004'));
