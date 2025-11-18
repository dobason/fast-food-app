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

  // Phải có storeId để Drone biết bay đến tọa độ nào lấy hàng 
  storeId: {
    type: String, 
    required: true
  },
  storeName: String, // Giữ lại field này để hiện thị lịch sử cho nhanh, đỡ phải gọi API qua restaurant-service

  // --- 2. DANH SÁCH MÓN ĂN (CHO MERCHANT DASHBOARD) ---
  items: [
    {
      productId: String,
      name: String,
      quantity: Number,
      price: Number,
      image: String // (Tùy chọn) Để hiện hình món ăn trong đơn hàng
    }
  ],

  total: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    // Cập nhật thêm các trạng thái phù hợp với quy trình giao đồ ăn
    enum: ['pending', 'confirmed', 'preparing', 'delivering', 'completed', 'cancelled'],
    default: 'pending'
  },

  // --- 3. THÔNG TIN GIAO HÀNG & DRONE ---
  deliveryId: {
    type: String,
    default: null // Khi mới đặt đơn thì chưa có Drone nhận, nên là null
  },

  dest_lat: Number,
  dest_lng: Number,
  dest_location: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);