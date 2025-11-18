const User = require('../models/User'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

// 1. Đăng ký người dùng mới (Hỗ trợ Merchant và Admin)
exports.register = async (req, res) => {
    try {
        const { name, email, password, role, phone, address, storeName, storeDescription, storeLocation } = req.body;

        // Kiểm tra xem email đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Nếu role là merchant thì bắt buộc phải có tên cửa hàng
        if (role === 'merchant') {
            if (!storeName || !storeLocation) {
                return res.status(400).json({ 
                    message: 'Merchant must provide storeName and storeLocation' 
                });
            }
        }

        const hashed = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            name,
            email,
            password: hashed,
            role: role || 'user', // Mặc định là user nếu không truyền role
            phone,
            address,
            // Lưu thông tin merchant nếu có
            storeName: role === 'merchant' ? storeName : undefined,
            storeDescription: role === 'merchant' ? storeDescription : undefined,
            storeLocation: role === 'merchant' ? storeLocation : undefined
        });

        await newUser.save();

        // Trả về thông tin user (ẩn password)
        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json({ 
            message: 'User registered successfully', 
            user: userResponse 
        });
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

        // Đưa ROLE vào Token để middleware xử lý phân quyền
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // Token hết hạn sau 1 ngày
        );
        
        res.json({ 
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// 3. Lấy thông tin người dùng hiện tại
exports.profile = async (req, res) => {
    try {
        // req.user được lấy từ authMiddleware
        const user = await User.findById(req.user.id).select('-password'); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// 4. Admin: xem danh sách tất cả user
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); 
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// 5. Merchant: xem thông tin cửa hàng của mình
exports.getMerchantStore = async (req, res) => {
    try {
        // Tìm lại user trong DB để đảm bảo lấy thông tin mới nhất
        const user = await User.findById(req.user.id);
        
        if (user.role !== 'merchant') {
            return res.status(403).json({ message: 'Access denied: not a merchant' });
        }

        res.json({
            storeName: user.storeName,
            storeDescription: user.storeDescription,
            storeLocation: user.storeLocation,
            ownerName: user.name,
            contactPhone: user.phone
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};