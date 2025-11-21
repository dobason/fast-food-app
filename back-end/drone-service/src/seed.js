const mongoose = require('mongoose');
const Drone = require('./models/Drone');

// Dữ liệu mẫu với nhiều trường hợp khác nhau
const drones = [
  // IDLE drones - Sẵn sàng giao hàng
  {
    droneId: 'DRONE-001',
    battery: 100,
    current_lat: 10.823099, // Tại kho Gò Vấp
    current_lng: 106.629664,
    store_lat: 10.823099,
    store_lng: 106.629664,
    max_payload_kg: 5.0,
    max_range_km: 20.0,
    status: 'IDLE'
  },
  {
    droneId: 'DRONE-004',
    battery: 95,
    current_lat: 10.823099,
    current_lng: 106.629664,
    store_lat: 10.823099,
    store_lng: 106.629664,
    max_payload_kg: 5.0,
    max_range_km: 20.0,
    status: 'IDLE'
  },
  {
    droneId: 'DRONE-005',
    battery: 88,
    current_lat: 10.823099,
    current_lng: 106.629664,
    store_lat: 10.823099,
    store_lng: 106.629664,
    max_payload_kg: 5.0,
    max_range_km: 20.0,
    status: 'IDLE'
  },

  // DELIVERING drones - Đang giao hàng
  {
    droneId: 'DRONE-002',
    battery: 65.5,
    current_lat: 10.780000, // Đang bay đến Quận 2
    current_lng: 106.680000,
    store_lat: 10.823099,
    store_lng: 106.629664,
    max_payload_kg: 8.0,
    max_range_km: 30.0,
    status: 'DELIVERING'
  },
  {
    droneId: 'DRONE-006',
    battery: 72.0,
    current_lat: 10.750000, // Đang bay đến Quận 7
    current_lng: 106.710000,
    store_lat: 10.823099,
    store_lng: 106.629664,
    max_payload_kg: 8.0,
    max_range_km: 30.0,
    status: 'DELIVERING'
  },
  {
    droneId: 'DRONE-007',
    battery: 55.0,
    current_lat: 10.815000, // Đang bay đến Quận Tân Bình
    current_lng: 106.625000,
    store_lat: 10.823099,
    store_lng: 106.629664,
    max_payload_kg: 8.0,
    max_range_km: 30.0,
    status: 'DELIVERING'
  },

  // RETURNING drones - Đang trở về kho
  {
    droneId: 'DRONE-008',
    battery: 42.0,
    current_lat: 10.770000,
    current_lng: 106.660000,
    store_lat: 10.823099,
    store_lng: 106.629664,
    max_payload_kg: 5.0,
    max_range_km: 20.0,
    status: 'RETURNING'
  },
  {
    droneId: 'DRONE-009',
    battery: 38.5,
    current_lat: 10.800000,
    current_lng: 106.655000,
    store_lat: 10.823099,
    store_lng: 106.629664,
    max_payload_kg: 5.0,
    max_range_km: 20.0,
    status: 'RETURNING'
  },

  // CHARGING drones - Đang sạc pin
  {
    droneId: 'DRONE-003',
    battery: 25.0,
    current_lat: 10.823099,
    current_lng: 106.629664,
    store_lat: 10.823099,
    store_lng: 106.629664,
    max_payload_kg: 5.0,
    max_range_km: 20.0,
    status: 'CHARGING'
  },
  {
    droneId: 'DRONE-010',
    battery: 15.5,
    current_lat: 10.823099,
    current_lng: 106.629664,
    store_lat: 10.823099,
    store_lng: 106.629664,
    max_payload_kg: 5.0,
    max_range_km: 20.0,
    status: 'CHARGING'
  },

  // MAINTENANCE drone - Đang bảo trì
  {
    droneId: 'DRONE-011',
    battery: 0,
    current_lat: 10.823099,
    current_lng: 106.629664,
    store_lat: 10.823099,
    store_lng: 106.629664,
    max_payload_kg: 10.0,
    max_range_km: 50.0,
    status: 'MAINTENANCE'
  },

  // OFFLINE drone
  {
    droneId: 'DRONE-012',
    battery: 0,
    current_lat: 10.823099,
    current_lng: 106.629664,
    store_lat: 10.823099,
    store_lng: 106.629664,
    max_payload_kg: 5.0,
    max_range_km: 20.0,
    status: 'OFFLINE'
  }
];

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    console.log('Connected to MongoDB for seeding');

    // Sử dụng updateOne với upsert: true cho mỗi drone
    let upsertedCount = 0;
    let modifiedCount = 0;

    for (const drone of drones) {
      const result = await Drone.updateOne(
        { droneId: drone.droneId }, // Filter: tìm theo droneId
        { $set: drone }, // Update: cập nhật toàn bộ dữ liệu
        { upsert: true } // Tạo mới nếu không tồn tại
      );

      if (result.upsertedCount > 0) {
        upsertedCount++;
      } else if (result.modifiedCount > 0) {
        modifiedCount++;
      }
    }

    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
    process.exit(0);
  })
  .catch(err => {
    console.error('Seeding error:', err);
    mongoose.connection.close();
    process.exit(1);
  });

