const Order = require('../models/Order');
const apiClient = require('../utils/apiClient');

// Create new order
exports.createOrder = async (req, res) => {
  console.log("🚀 [DEBUG] Bắt đầu xử lý tạo đơn hàng...");
  try {
    const { userId, items } = req.body;
    console.log("📦 [DEBUG] Dữ liệu nhận được:", { userId, itemsCount: items?.length });

    if (!userId || !items || items.length === 0) {
      return res.status(400).json({ message: 'Missing userId or items' });
    }

    // 1. Tính tổng tiền
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    console.log("💰 [DEBUG] Tổng tiền tính toán:", total);

    // 2. Tạo đơn hàng
    const order = new Order({ userId, items, total, status: 'pending' });
    await order.save();
    console.log("✅ [DEBUG] Đã lưu Order vào DB:", order._id);

    // 3. Gọi Payment Service
    const transactionId = `txn_${Date.now()}`;
    console.log("📡 [DEBUG] Đang gọi sang Payment Service...");

    try {
        const paymentRes = await apiClient.post('http://payment-service:5004/api/payments', {
            orderId: order._id,
            userId,
            amount: total,
            transactionId: transactionId
        });

        console.log("📩 [DEBUG] Payment Service trả lời:", paymentRes.data);

        if (paymentRes.data.payment && paymentRes.data.payment.status === 'success') {
            order.status = 'paid';
        } else {
            order.status = 'failed';
        }
    } catch (paymentError) {
        console.error("❌ [DEBUG] Lỗi khi gọi Payment Service:", paymentError.message);
        order.status = 'failed';
    }

    await order.save();
    console.log("🏁 [DEBUG] Hoàn tất đơn hàng. Status:", order.status);

    res.status(201).json({
      message: 'Order processed',
      order
    });

  } catch (error) {
    console.error('❌ [DEBUG] Lỗi Server:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all orders with optional filters
exports.getAllOrders = async (req, res) => {
  try {
    const { userId, status, page = 1, limit = 10 } = req.query;

    const query = {};
    if (userId) query.userId = userId;
    if (status) query.status = status;

    const skip = (page - 1) * limit;

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Order.countDocuments(query);

    res.status(200).json({
      message: 'Orders retrieved successfully',
      orders,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order retrieved successfully',
      order
    });

  } catch (error) {
    console.error('Error fetching order:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete order
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order deleted successfully',
      order
    });

  } catch (error) {
    console.error('Error deleting order:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};