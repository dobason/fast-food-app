const mongoose = require('mongoose');
const { Schema } = mongoose;

const restaurantSchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: true,
    trim: true
  },
  storeDescription: {
    type: String,
    trim: true
  },
  storeLocation: {
    type: String,
    required: true
  },
  // Mảng các String (URL ảnh)
  logo: {
    type: [String],
    default: []
  },
  // Vĩ độ (Latitude)
  start_lat: {
    type: Number,
    required: true
  },
  // Kinh độ (Longitude)
  start_lng: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Restaurant', restaurantSchema);