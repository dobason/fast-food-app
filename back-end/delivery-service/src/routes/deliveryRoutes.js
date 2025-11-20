const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');

// Định nghĩa các route
r/**
 * @swagger
 * components:
 *  schemas:
 *    Delivery:
 *      type: object
 *      required:
 *        - droneId
 *        - orderId
 *        - dest_lat
 *        - dest_lng
 *        - start_lat
 *        - start_lng
 *      properties:
 *        id:
 *          type: string
 *          description: ID tự động tạo của MongoDB
 *        droneId:
 *          type: string
 *          description: ID của Drone thực hiện giao hàng
 *        orderId:
 *          type: string
 *          description: ID của đơn hàng được giao
 *        dest_lat:
 *          type: number
 *          format: double
 *          description: Vĩ độ điểm đến (Destination Latitude)
 *        dest_lng:
 *          type: number
 *          format: double
 *          description: Kinh độ điểm đến (Destination Longitude)
 *        start_lat:
 *          type: number
 *          format: double
 *          description: Vĩ độ điểm bắt đầu (Start Latitude)
 *        start_lng:
 *          type: number
 *          format: double
 *          description: Kinh độ điểm bắt đầu (Start Longitude)
 *        status:
 *          type: string
 *          enum: [PENDING, IN_TRANSIT, DELIVERED, CANCELLED]
 *          description: Trạng thái của chuyến giao hàng
 *        createdAt:
 *          type: string
 *          format: date-time
 *          description: Thời gian tạo
 *      example:
 *        droneId: "drone-123"
 *        orderId: "order-456"
 *        dest_lat: 10.762622
 *        dest_lng: 106.660172
 *        start_lat: 10.823099
 *        start_lng: 106.629664
 *        status: "PENDING"
 */

/**
 * @swagger
 * tags:
 *   name: Deliveries
 *   description: API quản lý giao hàng
 */

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