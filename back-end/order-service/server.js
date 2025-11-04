const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./src/routes/orderRoutes');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://mongodb:27017/orders')
  .then(() => console.log('✅ Connected to MongoDB - Order Service'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Order Service is running');
});

app.listen(5003, () => console.log('🚀 Order Service running on port 5003'));
