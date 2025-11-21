const Restaurant = require('../models/Restaurant');

// @desc    Tạo mới nhà hàng
// @route   POST /api/restaurants
exports.createRestaurant = async (req, res) => {
  try {
    const { storeName, storeDescription, storeLocation, logo, start_lat, start_lng } = req.body;

    // Validate cơ bản
    if (!storeName || !storeLocation || !start_lat || !start_lng) {
      return res.status(400).json({ message: 'Vui lòng nhập các trường bắt buộc' });
    }

    const newRestaurant = new Restaurant({
      storeName,
      storeDescription,
      storeLocation,
      logo, // Mảng URL hình ảnh
      start_lat,
      start_lng
    });

    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy danh sách tất cả nhà hàng
// @route   GET /api/restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy chi tiết nhà hàng theo ID
// @route   GET /api/restaurants/:id
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Không tìm thấy nhà hàng' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cập nhật thông tin nhà hàng
// @route   PUT /api/restaurants/:id
exports.updateRestaurant = async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ message: 'Không tìm thấy nhà hàng để cập nhật' });
    }

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Xóa nhà hàng
// @route   DELETE /api/restaurants/:id
exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Không tìm thấy nhà hàng để xóa' });
    }

    res.status(200).json({ message: 'Đã xóa nhà hàng thành công' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};