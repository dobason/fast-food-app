const Restaurant = require('../models/Restaurant');

// Tạo nhà hàng mới (Dành cho Merchant đăng ký)
exports.createRestaurant = async (req, res) => {
  try {
    const newRestaurant = new Restaurant(req.body);
    const saved = await newRestaurant.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Lấy thông tin nhà hàng theo Owner ID (Dùng cho trang Dashboard Merchant)
exports.getRestaurantByOwner = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ ownerId: req.params.ownerId });
    res.status(200).json(restaurant);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Lấy tất cả nhà hàng (Dùng cho User lướt xem)
exports.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json(restaurants);
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.getProductsByRestaurant = async (req, res) => {
  try {
    const products = await Product.find({ restaurantId: req.params.restaurantId });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};