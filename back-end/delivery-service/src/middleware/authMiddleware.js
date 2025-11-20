const jwt = require('jsonwebtoken');

exports.authMiddleware = async (req, res, next) => {
    try {
        // 1. Kiểm tra header Authorization
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // 2. Lấy token và giải mã
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Gán thông tin từ token vào req.user (Không query DB)
        // req.user sẽ có dạng: { id: "...", role: "..." }
        req.user = decoded; 
        
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token', error: error.message });
    }   
}

exports.roleMiddleware = (...roles) => {
    // 4. Làm phẳng mảng để tránh lỗi nếu lỡ truyền roleMiddleware(['admin', 'user'])
    const allowedRoles = roles.flat();

    return (req, res, next) => {
        // Kiểm tra xem user có role hợp lệ không
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied: insufficient permissions' });
        }
        next();
    }
}