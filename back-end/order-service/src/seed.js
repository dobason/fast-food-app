const mongoose = require('mongoose');
const Order = require('./models/Order');

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    console.log('Connected to MongoDB for seeding');

    const sample = [
      {
        userId: 'user1',
        products: [
          { productId: 'product1', quantity: 2 },
          { productId: 'product2', quantity: 1 }
        ],
        total: 170000,
        status: 'completed',
        address: '123 Main St'
      },
      {
        userId: 'user2',
        products: [
          { productId: 'product3', quantity: 1 }
        ],
        total: 50000,
        status: 'pending',
        address: '456 Second St'
      }
    ];

    for (const item of sample) {
      await Order.updateOne(
        { userId: item.userId, total: item.total },
        { $set: item },
        { upsert: true }
      );
    }
    console.log('✅ Sample orders inserted (if not exist) or updated');
    mongoose.connection.close();
  })
  .catch(err => console.error('Seeding error:', err));
