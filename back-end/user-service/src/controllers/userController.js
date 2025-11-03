const User = require('../models/User'); //Mongoose model người dùng
const bcrypt = require('bcryptjs'); //Thư viện băm mật khẩu
const jwt = require('jsonwebtoken'); //Thư viện tạo JSON Web Token

//Đăng ký người dùng mới
exports.register = async (req, res) => {
    try {
        const { name, email, password, role, storeName, storeDescription, storeLocation } = req.body;

        const hashed = await bcrypt.hash(password, 10); //băm mật khẩu
        //Tao người dùng mới
        const newUser = new User({
            name,
            email,
            password: hashed,
            role,
            storeName,
            storeDescription,
            storeLocation
        });
        await newUser.save(); //Lưu người dùng vào DB
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    }catch (error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

//Đăng nhập người dùng
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //Hàm findOne để tìm một người dùng trong cơ sở dữ liệu dựa trên email đã cung cấp
        const user = await User.findOne({ email });
        if(!user){ return res.status(400).json({ message: 'Invalid credentials' }); }

        const isMatch = await bcrypt.compare(password, user.password); //So sánh mật khẩu
        if(!isMatch){ return res.status(400).json({ message: 'Invalid credentials' }); }

        // Lưu trữ token
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET );
        res.json({ token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Lấy thông tin người dùng
exports.profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); //Loại bỏ mật khẩu
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Admin: xem danh sách user
exports.getAllUsers = async (req, res) => {
    const users = await User.find().select('-password'); //Loại bỏ mật khẩu
    res.json(users);
}

//Merchant: xem thông tin cửa hàng của mình
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