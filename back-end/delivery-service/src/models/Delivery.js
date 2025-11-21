const mongoose = require('mongoose');
const { Schema } = mongoose;

const deliverySchema = new mongoose.Schema({
  droneId: {
    type: String,
    required: true,
    trim: true
  },
  orderId: {
    type: String,
    required: true,
    unique: true, // Giả sử mỗi đơn hàng chỉ có 1 chuyến giao
    trim: true
  },

  // Điểm đến (Destination)
  dest_lat: {
    type: Number,
    required: true
  },
  dest_lng: {
    type: Number,
    required: true
  },

  // Điểm bắt đầu (Start/Origin)
  start_lat: {
    type: Number,
    required: true
  },
  start_lng: {
    type: Number,
    required: true
  },
  
  status: {
    type: String,
    enum: ['PENDING', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED'],
    default: 'PENDING'
  }
}, {
  timestamps: true // Tự động tạo createdAt và updatedAt
});

module.exports = mongoose.model('Delivery', deliverySchema);