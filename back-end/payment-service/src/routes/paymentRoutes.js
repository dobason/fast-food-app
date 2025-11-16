const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Process a payment
 *     tags: [Payments]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - transactionId
 *             - orderId
 *             - userId
 *             - amount
 *           properties:
 *             transactionId:
 *               type: string
 *             orderId:
 *               type: string
 *             userId:
 *               type: string
 *             amount:
 *               type: number
 *             status:
 *               type: string
 *               enum: [success, failed]
 *             createdAt:
 *               type: string
 *               format: date-time
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *         description: Bearer token (e.g., Bearer <token>)
 *     responses:
 *       201:
 *         description: Payment processed successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/', authMiddleware, roleMiddleware(['admin', 'merchant', 'user']), paymentController.processPayment);

module.exports = router;
