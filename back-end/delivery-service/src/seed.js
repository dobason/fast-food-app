const mongoose = require('mongoose');
const Delivery = require('./models/Delivery');

// Dữ liệu mẫu với nhiều trường hợp khác nhau
const deliveries = [
  // PENDING deliveries
  {
    droneId: 'DRONE-001',
    orderId: 'ORDER-1001',
    dest_lat: 10.762622,
    dest_lng: 106.660172, // Quận 1, TP.HCM
    start_lat: 10.823099,
    start_lng: 106.629664, // Kho Gò Vấp
    status: 'PENDING'
  },
  {
    droneId: 'DRONE-004',
    orderId: 'ORDER-1004',
    dest_lat: 10.771443,
    dest_lng: 106.694736, // Quận Bình Thạnh
    start_lat: 10.823099,
    start_lng: 106.629664,
    status: 'PENDING'
  },
  {
    droneId: 'DRONE-005',
    orderId: 'ORDER-1005',
    dest_lat: 10.785123,
    dest_lng: 106.695456, // Quận Phú Nhuận
    start_lat: 10.823099,
    start_lng: 106.629664,
    status: 'PENDING'
  },

  // IN_TRANSIT deliveries
  {
    droneId: 'DRONE-002',
    orderId: 'ORDER-1002',
    dest_lat: 10.776530,
    dest_lng: 106.700980, // Quận 2
    start_lat: 10.823099,
    start_lng: 106.629664,
    status: 'IN_TRANSIT'
  },
  {
    droneId: 'DRONE-006',
    orderId: 'ORDER-1006',
    dest_lat: 10.729263,
    dest_lng: 106.722526, // Quận 7
    start_lat: 10.823099,
    start_lng: 106.629664,
    status: 'IN_TRANSIT'
  },
  {
    droneId: 'DRONE-007',
    orderId: 'ORDER-1007',
    dest_lat: 10.815309,
    dest_lng: 106.625763, // Quận Tân Bình
    start_lat: 10.823099,
    start_lng: 106.629664,
    status: 'IN_TRANSIT'
  },

  // DELIVERED deliveries
  {
    droneId: 'DRONE-003',
    orderId: 'ORDER-1003',
    dest_lat: 10.754666,
    dest_lng: 106.676922, // Quận 5
    start_lat: 10.823099,
    start_lng: 106.629664,
    status: 'DELIVERED'
  },
  {
    droneId: 'DRONE-008',
    orderId: 'ORDER-1008',
    dest_lat: 10.772218,
    dest_lng: 106.657950, // Quận 3
    start_lat: 10.823099,
    start_lng: 106.629664,
    status: 'DELIVERED'
  },
  {
    droneId: 'DRONE-009',
    orderId: 'ORDER-1009',
    dest_lat: 10.801824,
    dest_lng: 106.655302, // Quận 10
    start_lat: 10.823099,
    start_lng: 106.629664,
    status: 'DELIVERED'
  },
  {
    droneId: 'DRONE-010',
    orderId: 'ORDER-1010',
    dest_lat: 10.738564,
    dest_lng: 106.677878, // Quận 4
    start_lat: 10.823099,
    start_lng: 106.629664,
    status: 'DELIVERED'
  },

  // CANCELLED deliveries
  {
    droneId: 'DRONE-011',
    orderId: 'ORDER-1011',
    dest_lat: 10.854235,
    dest_lng: 106.762736, // Quận Thủ Đức
    start_lat: 10.823099,
    start_lng: 106.629664,
    status: 'CANCELLED'
  },
  {
    droneId: 'DRONE-012',
    orderId: 'ORDER-1012',
    dest_lat: 10.837389,
    dest_lng: 106.661894, // Quận 11
    start_lat: 10.823099,
    start_lng: 106.629664,
    status: 'CANCELLED'
  }
];

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    console.log('Connected to MongoDB for seeding');

    // Sử dụng updateOne với upsert: true cho mỗi delivery
    let upsertedCount = 0;
    let modifiedCount = 0;

    for (const delivery of deliveries) {
      const result = await Delivery.updateOne(
        { orderId: delivery.orderId }, // Filter: tìm theo orderId
        { $set: delivery }, // Update: cập nhật toàn bộ dữ liệu
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

