
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
        password: 'admin123', // Will be hashed below
        role: 'admin',
        phone: '0123456789',
        address: '123 Admin St',
        isActive: true
      },
      {
        name: 'Regular User',
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
        isActive: true
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'john123',
        role: 'user',
        phone: '0222333444',
        address: '321 Main St',
        isActive: true
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'jane123',
        role: 'user',
        phone: '0333444555',
        address: '654 Oak Ave',
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
