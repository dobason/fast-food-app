const mongoose = require('mongoose');
const { Schema } = mongoose;

const droneSchema = new mongoose.Schema({
  droneId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  battery: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    default: 100
  },
  // Vị trí hiện tại của Drone
  current_lat: {
    type: Number,
    required: true
  },
  current_lng: {
    type: Number,
    required: true
  },
  // Vị trí trạm sạc/cửa hàng (Home Base)
  store_lat: {
    type: Number,
    required: true
  },
  store_lng: {
    type: Number,
    required: true
  },
  max_payload_kg: {
    type: Number,
    required: true,
    min: 0
  },
  max_range_km: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['IDLE', 'DELIVERING', 'RETURNING', 'CHARGING', 'MAINTENANCE', 'OFFLINE'],
    default: 'IDLE'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Drone', droneSchema);
