const jwt = require('jsonwebtoken');
// const User = require('../models/User'); // <-- Bỏ dòng này vì chúng ta sẽ tin tưởng vào Token, không query DB nữa

exports.authMiddleware = async (req, res, next) => {
    try {
        // 1. Lấy token từ header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // 2. Lấy chuỗi token
        const token = authHeader.split(' ')[1];

        // 3. Giải mã và dùng luôn thông tin trong Token (Payload)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // QUAN TRỌNG: Gán thẳng thông tin từ token vào req.user
        // Lúc này req.user sẽ có đủ thông tin: { id, role, email, ... } mà User Service đã đóng gói
        req.user = decoded; 
        
        next(); // Chuyển sang middleware tiếp theo
    } catch (error) {
        res.status(401).json({ message: 'Invalid token', error: error.message });
    }   
}

exports.roleMiddleware = (...roles) => {
    // QUAN TRỌNG: Làm phẳng mảng để xử lý được cả 2 cách gọi:
    // 1. roleMiddleware('admin', 'merchant')
    // 2. roleMiddleware(['admin', 'merchant'])
    const allowedRoles = roles.flat();

    return (req, res, next) => {
        // Log để kiểm tra lại (bạn sẽ thấy nó chỉ còn 1 lớp ngoặc)
        console.log("🔍 [DEBUG] Quyền cho phép:", allowedRoles);
        console.log("👤 [DEBUG] User hiện tại:", req.user ? req.user.role : "Không có user");

        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied: insufficient permissions' });
        }
        next();
    }
}