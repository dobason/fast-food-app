const Payment = require('../models/payment');

// Giả lập thanh toán
exports.processPayment = async (req, res) => {
  try {
    const { orderId, userId, amount } = req.body;

    // Random 80% thành công
    const isSuccess = Math.random() < 0.8;
    const status = isSuccess ? 'success' : 'failed';

    const payment = new Payment({ orderId, userId, amount, status });
    await payment.save();

    res.status(201).json({
      message: isSuccess ? 'Payment successful' : 'Payment failed',
      payment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
