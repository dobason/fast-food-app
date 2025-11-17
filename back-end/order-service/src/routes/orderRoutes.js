const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

// --- Đã xóa comment Swagger tạm thời để log sạch sẽ ---

// API Tạo đơn hàng
router.post('/', authMiddleware, roleMiddleware('admin', 'merchant', 'user'), orderController.createOrder);


module.exports = router;