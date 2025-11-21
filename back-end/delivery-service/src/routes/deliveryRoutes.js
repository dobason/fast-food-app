const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');

/**
 * @swagger
 * /api/deliveries:
 *   post:
 *     summary: Tạo đơn giao hàng mới
 *     tags: [Deliveries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - address
 *               - recipientName
 *               - recipientPhone
 *             properties:
 *               orderId:
 *                 type: string
 *               address:
 *                 type: string
 *               recipientName:
 *                 type: string
 *               recipientPhone:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, processing, shipping, delivered, cancelled]
 *               deliveryDate:
 *                 type: string
 *                 format: date-time
 *               notes:
 *                 type: string
 *             example:
 *               orderId: "ORD123456"
 *               address: "123 Nguyễn Huệ, Quận 1, TP.HCM"
 *               recipientName: "Nguyễn Văn A"
 *               recipientPhone: "0901234567"
 *               status: "pending"
 *               deliveryDate: "2024-12-25T10:00:00Z"
 *               notes: "Giao hàng trong giờ hành chính"
 *     responses:
 *       201:
 *         description: Tạo đơn giao hàng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Delivery'
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', deliveryController.createDelivery);

/**
 * @swagger
 * /api/deliveries:
 *   get:
 *     summary: Lấy danh sách tất cả đơn giao hàng
 *     tags: [Deliveries]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, processing, shipping, delivered, cancelled]
 *         description: Lọc theo trạng thái
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Số trang
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Số lượng bản ghi trên mỗi trang
 *     responses:
 *       200:
 *         description: Danh sách đơn giao hàng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Delivery'
 *                 total:
 *                   type: integer
 *                   description: Tổng số bản ghi
 *                 page:
 *                   type: integer
 *                   description: Trang hiện tại
 *                 totalPages:
 *                   type: integer
 *                   description: Tổng số trang
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', deliveryController.getAllDeliveries);

/**
 * @swagger
 * /api/deliveries/{id}:
 *   get:
 *     summary: Lấy thông tin đơn giao hàng theo ID
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của đơn giao hàng
 *     responses:
 *       200:
 *         description: Chi tiết đơn giao hàng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Delivery'
 *       404:
 *         description: Không tìm thấy đơn giao hàng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', deliveryController.getDeliveryById);

/**
 * @swagger
 * /api/deliveries/{id}:
 *   put:
 *     summary: Cập nhật thông tin đơn giao hàng
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của đơn giao hàng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *               address:
 *                 type: string
 *               recipientName:
 *                 type: string
 *               recipientPhone:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, processing, shipping, delivered, cancelled]
 *               deliveryDate:
 *                 type: string
 *                 format: date-time
 *               notes:
 *                 type: string
 *             example:
 *               status: "shipping"
 *               notes: "Đang trên đường giao hàng"
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Delivery'
 *       404:
 *         description: Không tìm thấy đơn giao hàng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', deliveryController.updateDelivery);

/**
 * @swagger
 * /api/deliveries/{id}:
 *   delete:
 *     summary: Xóa đơn giao hàng
 *     tags: [Deliveries]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của đơn giao hàng
 *     responses:
 *       200:
 *         description: Xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Đơn giao hàng đã được xóa thành công
 *       404:
 *         description: Không tìm thấy đơn giao hàng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', deliveryController.deleteDelivery);

module.exports = router;
