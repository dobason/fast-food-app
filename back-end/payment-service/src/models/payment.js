const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  orderId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  method: String,
  address: String,
  payment_method: {
    type: String,
    enum: ['credit_card', 'debit_card', 'paypal', 'cash', 'bank_transfer']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);
