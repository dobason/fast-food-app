const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    console.log('Connected to MongoDB for seeding');

    const sample = [
      {
        name: 'Burger',
        price: 50000,
        quantity: 10,
        category: 'Fast Food',
        description: 'Burger bò Mỹ',
        images: ['burger.jpg']
      },
      {
        name: 'Pizza',
        price: 120000,
        quantity: 8,
        category: 'Fast Food',
        description: 'Pizza phô mai',
        images: ['pizza.jpg']
      },
      {
        name: 'Coke',
        price: 15000,
        quantity: 20,
        category: 'Drink',
        description: 'Coca Cola',
        images: ['coke.jpg']
      }
    ];

    for (const item of sample) {
      await Product.updateOne(
        { name: item.name },
        { $set: item },
        { upsert: true }
      );
    }
    console.log('✅ Sample products inserted (if not exist) or updated');
    mongoose.connection.close();
  })
  .catch(err => console.error('Seeding error:', err));
