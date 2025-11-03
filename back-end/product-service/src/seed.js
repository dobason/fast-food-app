const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://mongodb:27017/products')
  .then(async () => {
    console.log('Connected to MongoDB for seeding');

    const sample = [
      { name: 'Burger', price: 50000, stock: 10, category: 'Fast Food', description: 'Burger bò Mỹ', image: 'burger.jpg' },
      { name: 'Pizza', price: 120000, stock: 8, category: 'Fast Food', description: 'Pizza phô mai', image: 'pizza.jpg' },
      { name: 'Coke', price: 15000, stock: 20, category: 'Drink', description: 'Coca Cola', image: 'coke.jpg' }
    ];

    await Product.insertMany(sample);
    console.log('✅ Sample products inserted');
    mongoose.connection.close();
  })
  .catch(err => console.error('Seeding error:', err));
