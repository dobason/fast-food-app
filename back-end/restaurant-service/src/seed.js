const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');

// Dữ liệu mẫu nhà hàng
const restaurants = [
  {
    storeName: 'KFC Gò Vấp',
    storeDescription: 'Chuỗi gà rán nổi tiếng thế giới với công thức bí mật 11 loại gia vị',
    storeLocation: 'Quận Gò Vấp, TP.HCM',
    logo: ['https://upload.wikimedia.org/wikipedia/en/thumb/5/57/KFC_logo-image.svg/200px-KFC_logo-image.svg.png'],
    start_lat: 10.823099,
    start_lng: 106.629664,
    isActive: true
  },
  {
    storeName: 'McDonald\'s Quận 1',
    storeDescription: 'Nhà hàng fastfood Mỹ với burger, khoai tây chiên và các món ăn nhanh',
    storeLocation: 'Quận 1, TP.HCM',
    logo: ['https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/200px-McDonald%27s_Golden_Arches.svg.png'],
    start_lat: 10.762622,
    start_lng: 106.660172,
    isActive: true
  },
  {
    storeName: 'Pizza Hut Quận 2',
    storeDescription: 'Chuỗi pizza nổi tiếng với đế dày mềm và nhiều loại topping',
    storeLocation: 'Quận 2, TP.HCM',
    logo: ['https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Pizza_Hut_logo.svg/200px-Pizza_Hut_logo.svg.png'],
    start_lat: 10.776530,
    start_lng: 106.700980,
    isActive: true
  },
  {
    storeName: 'Lotteria Bình Thạnh',
    storeDescription: 'Chuỗi fastfood Hàn Quốc với burger, gà rán và các món ăn vặt',
    storeLocation: 'Quận Bình Thạnh, TP.HCM',
    logo: ['https://www.lotteria.vn/grs-static/images/logo.png'],
    start_lat: 10.771443,
    start_lng: 106.694736,
    isActive: true
  },
  {
    storeName: 'Domino\'s Pizza Quận 7',
    storeDescription: 'Pizza giao hàng nhanh với nhiều ưu đãi hấp dẫn',
    storeLocation: 'Quận 7, TP.HCM',
    logo: ['https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Dominos_pizza_logo.svg/200px-Dominos_pizza_logo.svg.png'],
    start_lat: 10.729263,
    start_lng: 106.722526,
    isActive: true
  },
  {
    storeName: 'Burger King Quận 3',
    storeDescription: 'Burger nướng than hoa với hương vị độc đáo',
    storeLocation: 'Quận 3, TP.HCM',
    logo: ['https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Burger_King_logo_%281999%29.svg/200px-Burger_King_logo_%281999%29.svg.png'],
    start_lat: 10.772218,
    start_lng: 106.657950,
    isActive: true
  },
  {
    storeName: 'Jollibee Quận 10',
    storeDescription: 'Chuỗi fastfood Philippines nổi tiếng với Chickenjoy và Jolly Spaghetti',
    storeLocation: 'Quận 10, TP.HCM',
    logo: ['https://upload.wikimedia.org/wikipedia/en/thumb/8/84/Jollibee_2011_logo.svg/200px-Jollibee_2011_logo.svg.png'],
    start_lat: 10.801824,
    start_lng: 106.655302,
    isActive: true
  },
  {
    storeName: 'Popeyes Quận Tân Bình',
    storeDescription: 'Gà rán Louisiana với hương vị cay nồng đặc trưng',
    storeLocation: 'Quận Tân Bình, TP.HCM',
    logo: ['https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Popeyes_Louisiana_Kitchen_logo.svg/200px-Popeyes_Louisiana_Kitchen_logo.svg.png'],
    start_lat: 10.815309,
    start_lng: 106.625763,
    isActive: true
  },
  {
    storeName: 'Texas Chicken Quận 5',
    storeDescription: 'Gà rán kiểu Mỹ với công thức độc quyền',
    storeLocation: 'Quận 5, TP.HCM',
    logo: ['https://www.texaschicken.com.vn/images/logo.png'],
    start_lat: 10.754666,
    start_lng: 106.676922,
    isActive: true
  },
  {
    storeName: 'BBQ Chicken Phú Nhuận',
    storeDescription: 'Gà rán kiểu Hàn Quốc với sốt BBQ đặc biệt',
    storeLocation: 'Quận Phú Nhuận, TP.HCM',
    logo: ['https://bbqchicken.vn/wp-content/uploads/2021/03/logo.png'],
    start_lat: 10.785123,
    start_lng: 106.695456,
    isActive: true
  },
  {
    storeName: 'The Pizza Company Quận 4',
    storeDescription: 'Pizza Thái Lan với nhiều hương vị Á Đông',
    storeLocation: 'Quận 4, TP.HCM',
    logo: ['https://www.thepizzacompany.vn/images/logo.png'],
    start_lat: 10.738564,
    start_lng: 106.677878,
    isActive: true
  },
  {
    storeName: 'Subway Quận 11',
    storeDescription: 'Bánh mì sandwich tươi ngon với nhiều loại rau và thịt',
    storeLocation: 'Quận 11, TP.HCM',
    logo: ['https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Subway_2016_logo.svg/200px-Subway_2016_logo.svg.png'],
    start_lat: 10.837389,
    start_lng: 106.661894,
    isActive: false
  }
];

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    console.log('Connected to MongoDB for seeding');

    // Sử dụng updateOne với upsert: true cho mỗi restaurant
    let upsertedCount = 0;
    let modifiedCount = 0;

    for (const restaurant of restaurants) {
      const result = await Restaurant.updateOne(
        { storeName: restaurant.storeName }, // Filter: tìm theo storeName
        { $set: restaurant }, // Update: cập nhật toàn bộ dữ liệu
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
