const mongoose = require('mongoose');
const Payment = require('./models/Payment');

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    console.log('Connected to MongoDB for seeding');

    const sample = [
      {
        orderId: 'order1',
        userId: 'user1',
        amount: 100000,
        status: 'success',
        transactionId: 'txn1',
        createdAt: new Date()
      },
      {
        orderId: 'order2',
        userId: 'user2',
        amount: 50000,
        status: 'failed',
        transactionId: 'txn2',
        createdAt: new Date()
      }
    ];

    for (const item of sample) {
      await Payment.updateOne(
        { transactionId: item.transactionId },
        { $set: item },
        { upsert: true }
      );
    }
    console.log('✅ Sample payments inserted (if not exist) or updated');
    mongoose.connection.close();
  })
  .catch(err => console.error('Seeding error:', err));
