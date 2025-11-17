const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    console.log('Connected to MongoDB for seeding');

    // Create a default storeId for sample products
    const mongoose = require('mongoose');
    const defaultStoreId = new mongoose.Types.ObjectId('507f1f77bcf86cd799439011');

    const sample = [
      {
        productId: 'PROD001',
        name: 'Burger Bò Mỹ',
        price: 50000,
        quantity: 10,
        category: 'Fast Food',
        description: 'Burger bò Mỹ cao cấp',
        storeId: defaultStoreId,
        images: ['burger.jpg', 'burger2.jpg']
      },
      {
        productId: 'PROD002',
        name: 'Pizza Phô Mai',
        price: 120000,
        quantity: 8,
        category: 'Fast Food',
        description: 'Pizza phô mai 4 loại',
        storeId: defaultStoreId,
        images: ['pizza.jpg']
      },
      {
        productId: 'PROD003',
        name: 'Coca Cola',
        price: 15000,
        quantity: 20,
        category: 'Drink',
        description: 'Coca Cola nguyên bản 330ml',
        storeId: defaultStoreId,
        images: ['coke.jpg']
      },
      {
        productId: 'PROD004',
        name: 'Gà Rán',
        price: 45000,
        quantity: 15,
        category: 'Fast Food',
        description: 'Gà rán giòn tan',
        storeId: defaultStoreId,
        images: ['chicken.jpg']
      },
      {
        productId: 'PROD005',
        name: 'Pepsi',
        price: 15000,
        quantity: 20,
        category: 'Drink',
        description: 'Pepsi 330ml',
        storeId: defaultStoreId,
        images: ['pepsi.jpg']
      }
    ];

    for (const item of sample) {
      await Product.updateOne(
        { productId: item.productId },
        { $set: item },
        { upsert: true }
      );
    }
    console.log('✅ Sample products inserted (if not exist) or updated');
    mongoose.connection.close();
  })
  .catch(err => console.error('Seeding error:', err));
