const Payment = require('../models/Payment');

exports.processPayment = async (req, res) => {
  try {
    const { orderId, userId, amount, transactionId } = req.body;
    if (!orderId || !userId || !amount || !transactionId)
      return res.status(400).json({ message: "Missing fields" });

    // Giả lập thanh toán ngẫu nhiên
    const isSuccess = Math.random() > 0.3;

    const payment = new Payment({
      transactionId,
      orderId,
      userId,
      amount,
      status: isSuccess ? 'success' : 'failed',
    });

    await payment.save();

    res.status(200).json({
      message: isSuccess ? 'Payment successful' : 'Payment failed',
      payment,
    });
  } catch (err) {
    console.error('❌ Payment Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
