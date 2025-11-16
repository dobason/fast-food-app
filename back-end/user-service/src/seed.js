
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    console.log('Connected to MongoDB for seeding');

    const sample = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123', // In production, hash passwords!
        role: 'admin',
        phone: '0123456789',
        address: '123 Admin St',
        isActive: true
      },
      {
        name: 'Normal User',
        email: 'user@example.com',
        password: 'user123',
        role: 'user',
        phone: '0987654321',
        address: '456 User Ave',
        isActive: true
      },
      {
        name: 'Merchant User',
        email: 'merchant@example.com',
        password: 'merchant123',
        role: 'merchant',
        phone: '0111222333',
        address: '789 Merchant Rd',
        storeName: 'Merchant Store',
        storeDescription: 'Best merchant store',
        storeLocation: 'District 1',
        isActive: true
      }
    ];

    for (const item of sample) {
      // Hash password with bcrypt
      item.password = await bcrypt.hash(item.password, 10);
      await User.updateOne(
        { email: item.email },
        { $set: item },
        { upsert: true }
      );
    }
    console.log('✅ Sample users inserted (if not exist) or updated');
    mongoose.connection.close();
  })
  .catch(err => console.error('Seeding error:', err));
