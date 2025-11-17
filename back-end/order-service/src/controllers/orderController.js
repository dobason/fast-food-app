const Order = require('../models/Order');
const apiClient = require('../utils/apiClient');

exports.createOrder = async (req, res) => {
  console.log("🚀 [DEBUG] Bắt đầu xử lý tạo đơn hàng..."); // Log 1
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
    console.log("📡 [DEBUG] Đang gọi sang Payment Service..."); // Log quan trọng
    
    try {
        // Gọi sang container payment-service
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
        // Quan trọng: Nếu lỗi gọi payment, vẫn phải trả về order cho khách biết
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