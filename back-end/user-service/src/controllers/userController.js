const User = require('../models/User'); //Mongoose model người dùng
const bcrypt = require('bcryptjs'); //Thư viện băm mật khẩu
const jwt = require('jsonwebtoken'); //Thư viện tạo JSON Web Token

// 1. Đăng ký người dùng mới
exports.register = async (req, res) => {
    try {
        // Đã thêm phone và address vào đây
        const { name, email, password, role, phone, address, storeName, storeDescription, storeLocation } = req.body;

        const hashed = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            name,
            email,
            password: hashed,
            role,
            phone,    // Đã thêm
            address,  // Đã thêm
            storeName,
            storeDescription,
            storeLocation
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// 2. Đăng nhập người dùng
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user){ return res.status(400).json({ message: 'Invalid credentials' }); }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){ return res.status(400).json({ message: 'Invalid credentials' }); }

        // === QUAN TRỌNG: Đưa ROLE vào Token ===
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET
        );
        
        res.json({ token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// 3. Lấy thông tin người dùng (Hàm này bị thiếu trong code của bạn, cần thêm lại)
exports.profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); 
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// 4. Admin: xem danh sách user
exports.getAllUsers = async (req, res) => {
    const users = await User.find().select('-password'); 
    res.json(users);
}

// 5. Merchant: xem thông tin cửa hàng của mình
exports.getMerchantStore = async (req, res) => {
    if (req.user.role !== 'merchant') {
        return res.status(403).json({ message: 'Access denied: not a merchant' });
    }
    res.json({
        storeName: req.user.storeName,
        storeDescription: req.user.storeDescription,
        storeLocation: req.user.storeLocation
    });
};