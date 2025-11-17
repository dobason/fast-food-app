const mongoose = require('mongoose');
const Payment = require('./models/Payment');

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    console.log('Connected to MongoDB for seeding');

    const sample = [
      {
        transactionId: 'TXN001',
        orderId: 'ORD001',
        amount: 170000,
        status: 'completed',
        method: 'Credit Card',
        payment_method: 'credit_card',
        address: '123 Nguyen Hue St, District 1, Ho Chi Minh City'
      },
      {
        transactionId: 'TXN002',
        orderId: 'ORD002',
        amount: 50000,
        status: 'pending',
        method: 'Cash',
        payment_method: 'cash',
        address: '456 Le Loi St, District 1, Ho Chi Minh City'
      },
      {
        transactionId: 'TXN003',
        orderId: 'ORD003',
        amount: 85000,
        status: 'completed',
        method: 'PayPal',
        payment_method: 'paypal',
        address: '789 Tran Hung Dao St, District 5, Ho Chi Minh City'
      },
      {
        transactionId: 'TXN004',
        orderId: 'ORD004',
        amount: 120000,
        status: 'completed',
        method: 'Bank Transfer',
        payment_method: 'bank_transfer',
        address: '321 Vo Van Tan St, District 3, Ho Chi Minh City'
      },
      {
        transactionId: 'TXN005',
        orderId: 'ORD005',
        amount: 45000,
        status: 'failed',
        method: 'Debit Card',
        payment_method: 'debit_card',
        address: '555 Hai Ba Trung St, District 3, Ho Chi Minh City'
      },
      {
        transactionId: 'TXN006',
        orderId: 'ORD001',
        amount: 170000,
        status: 'refunded',
        method: 'Credit Card',
        payment_method: 'credit_card',
        address: '123 Nguyen Hue St, District 1, Ho Chi Minh City'
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
