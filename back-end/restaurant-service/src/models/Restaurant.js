const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  ownerId: { type: String, required: true }, 

  // Tọa độ để Drone giao hàng (Quan trọng cho yêu cầu mới)
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  
  imageUrl: { type: String },
  isOpen: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Store', storeSchema);