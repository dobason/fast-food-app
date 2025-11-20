const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Delivery = require('./models/Delivery');

// Load biến môi trường từ file .env ở thư mục gốc của service
dotenv.config({ path: '../.env' }); 

// Dữ liệu mẫu
const deliveries = [
  {
    droneId: 'DRONE-001',
    orderId: 'ORDER-1001',
    dest_lat: 10.762622,
    dest_lng: 106.660172, // Ví dụ: Quận 1, TP.HCM
    start_lat: 10.823099,
    start_lng: 106.629664, // Ví dụ: Kho Gò Vấp
    status: 'PENDING'
  },
  {
    droneId: 'DRONE-002',
    orderId: 'ORDER-1002',
    dest_lat: 10.776530,
    dest_lng: 106.700980, // Ví dụ: Quận 2
    start_lat: 10.823099,
    start_lng: 106.629664,
    status: 'IN_TRANSIT'
  },
  {
    droneId: 'DRONE-003',
    orderId: 'ORDER-1003',
    dest_lat: 10.754666,
    dest_lng: 106.676922, // Ví dụ: Quận 5
    start_lat: 10.823099,
    start_lng: 106.629664,
    status: 'DELIVERED'
  }
];

const seedDeliveries = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/foody-delivery-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Xóa dữ liệu cũ
    await Delivery.deleteMany();
    console.log('Đã xóa dữ liệu Delivery cũ...');

    // Thêm dữ liệu mới
    await Delivery.insertMany(deliveries);
    console.log('Đã thêm dữ liệu mẫu Delivery thành công!');

    process.exit();
  } catch (error) {
    console.error(`Lỗi: ${error.message}`);
    process.exit(1);
  }
};

seedDeliveries();