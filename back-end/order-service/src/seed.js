const mongoose = require('mongoose');
const Order = require('./models/Order');

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    console.log('Connected to MongoDB for seeding');

    const sample = [
      {
        orderId: 'ORD001',
        userId: 'user1',
        total: 170000,
        status: 'delivered',
        storeName: 'Fast Food Store',
        dest_lat: 10.762622,
        dest_lng: 106.660172,
        dest_location: '123 Nguyen Hue St, District 1, Ho Chi Minh City'
      },
      {
        orderId: 'ORD002',
        userId: 'user2',
        total: 50000,
        status: 'pending',
        storeName: 'Pizza Palace',
        dest_lat: 10.772622,
        dest_lng: 106.670172,
        dest_location: '456 Le Loi St, District 1, Ho Chi Minh City'
      },
      {
        orderId: 'ORD003',
        userId: 'user1',
        total: 85000,
        status: 'processing',
        storeName: 'Burger King',
        dest_lat: 10.782622,
        dest_lng: 106.680172,
        dest_location: '789 Tran Hung Dao St, District 5, Ho Chi Minh City'
      },
      {
        orderId: 'ORD004',
        userId: 'user3',
        total: 120000,
        status: 'shipped',
        storeName: 'KFC',
        dest_lat: 10.792622,
        dest_lng: 106.690172,
        dest_location: '321 Vo Van Tan St, District 3, Ho Chi Minh City'
      },
      {
        orderId: 'ORD005',
        userId: 'user2',
        total: 45000,
        status: 'cancelled',
        storeName: 'McDonald\'s',
        dest_lat: 10.802622,
        dest_lng: 106.700172,
        dest_location: '555 Hai Ba Trung St, District 3, Ho Chi Minh City'
      }
    ];

    for (const item of sample) {
      await Order.updateOne(
        { orderId: item.orderId },
        { $set: item },
        { upsert: true }
      );
    }
    console.log('✅ Sample orders inserted (if not exist) or updated');
    mongoose.connection.close();
  })
  .catch(err => console.error('Seeding error:', err));
