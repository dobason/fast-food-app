const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - userId
 *             - items
 *           properties:
 *             userId:
 *               type: string
 *             items:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: string
 *                   name:
 *                     type: string
 *                   quantity:
 *                     type: number
 *                   price:
 *                     type: number
 *             storeName:
 *               type: string
 *             dest_lat:
 *               type: number
 *             dest_lng:
 *               type: number
 *             dest_location:
 *               type: string
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *         description: Bearer token (e.g., Bearer <token>)
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/', authMiddleware, roleMiddleware('admin', 'merchant', 'user'), orderController.createOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         type: string
 *         description: Filter by user ID
 *       - in: query
 *         name: status
 *         type: string
 *         description: Filter by order status
 *         enum: [pending, processing, shipped, delivered, cancelled]
 *       - in: query
 *         name: page
 *         type: number
 *         description: Page number
 *       - in: query
 *         name: limit
 *         type: number
 *         description: Items per page
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *         description: Bearer token (e.g., Bearer <token>)
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware, roleMiddleware('admin', 'merchant', 'user'), orderController.getAllOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Order ID
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *         description: Bearer token (e.g., Bearer <token>)
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *       404:
 *         description: Order not found
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete order
 *     tags: [Orders]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Order ID
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *         description: Bearer token (e.g., Bearer <token>)
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authMiddleware, roleMiddleware('admin', 'merchant', 'user'), orderController.getOrderById);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Delete order
 *     tags: [Orders]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Order ID
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *         description: Bearer token (e.g., Bearer <token>)
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authMiddleware, roleMiddleware('admin', 'merchant'), orderController.deleteOrder);

module.exports = router;
