const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  storeName: String,
  dest_lat: Number,
  dest_lng: Number,
  dest_location: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
