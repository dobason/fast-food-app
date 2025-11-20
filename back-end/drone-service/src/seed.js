const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Drone = require('./models/Drone');

// Load biến môi trường
dotenv.config({ path: '../.env' });

// Dữ liệu mẫu
const drones = [
  {
    droneId: 'DRONE-001',
    battery: 100,
    current_lat: 10.823099, // Tại kho
    current_lng: 106.629664,
    store_lat: 10.823099,
    store_lng: 106.629664,
    max_payload_kg: 5.0,
    max_range_km: 20.0,
    status: 'IDLE'
  },
  {
    droneId: 'DRONE-002',
    battery: 45.5,
    current_lat: 10.780000, // Đang ở đâu đó
    current_lng: 106.680000,
    store_lat: 10.823099,
    store_lng: 106.629664,
    max_payload_kg: 8.0,
    max_range_km: 30.0,
    status: 'DELIVERING'
  },
  {
    droneId: 'DRONE-003',
    battery: 10.0,
    current_lat: 10.823099,
    current_lng: 106.629664,
    store_lat: 10.823099,
    store_lng: 106.629664,
    max_payload_kg: 5.0,
    max_range_km: 20.0,
    status: 'CHARGING'
  },
  {
    droneId: 'DRONE-004',
    battery: 0,
    current_lat: 10.823099,
    current_lng: 106.629664,
    store_lat: 10.823099,
    store_lng: 106.629664,
    max_payload_kg: 10.0,
    max_range_km: 50.0,
    status: 'MAINTENANCE'
  }
];

const seedDrones = async () => {
  try {
    // Kết nối DB
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/foody-drone-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Xóa dữ liệu cũ
    await Drone.deleteMany();
    console.log('Đã xóa dữ liệu Drone cũ...');

    // Thêm dữ liệu mới
    await Drone.insertMany(drones);
    console.log('Đã thêm dữ liệu mẫu Drone thành công!');

    process.exit();
  } catch (error) {
    console.error(`Lỗi: ${error.message}`);
    process.exit(1);
  }
};

seedDrones();