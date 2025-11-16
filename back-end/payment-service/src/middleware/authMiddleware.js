const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authMiddleware = async (req, res, next) => {
    try {
        //Tạo giấy phép thông hành
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }

        //lấy và giải mã giấy thông hành
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Tìm người dùng
        const user = await User.findById(decoded.id);
        if (!user) { res.status(401).json({ message: 'User not found' }); }

        req.user = user;
        next(); //Chuyển sang middleware tiếp theo
    } catch (error) {
        res.status(401).json({ message: 'Invalid token', error: error.message });
    }   
}

exports.roleMiddleware = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied: insufficient permissions' });
        }
        next();
    }
}