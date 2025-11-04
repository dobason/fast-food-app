const Order = require('../models/Order');
const apiClient = require('../utils/apiClient');

exports.createOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;
    if (!userId || !items || items.length === 0) {
      return res.status(400).json({ message: 'Missing userId or items' });
    }

    // Tính tổng tiền
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Tạo order mới trong DB
    const order = new Order({ userId, items, total, status: 'pending' });
    await order.save();

    // Gọi Payment service để xử lý thanh toán
    const paymentRes = await apiClient.post('http://payment-service:5004/api/payments', {
      orderId: order._id,
      userId,
      amount: total
    });

    // Cập nhật trạng thái order
    if (paymentRes.data.payment.status === 'success') {
      order.status = 'paid';
    } else {
      order.status = 'failed';
    }

    await order.save();

    res.status(200).json({
      message: 'Order processed',
      order
    });
  } catch (error) {
    console.error('❌ Error in createOrder:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
