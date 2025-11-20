const express = require('express');
const router = express.Router();
const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant
} = require('../controllers/restaurantController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Restaurant:
 *       type: object
 *       required:
 *         - storeName
 *         - storeLocation
 *         - start_lat
 *         - start_lng
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID
 *         storeName:
 *           type: string
 *           description: Tên nhà hàng
 *         storeDescription:
 *           type: string
 *           description: Mô tả về nhà hàng
 *         storeLocation:
 *           type: string
 *           description: Địa chỉ hiển thị dạng text
 *         logo:
 *           type: array
 *           items:
 *             type: string
 *           description: Danh sách URL logo/hình ảnh
 *         start_lat:
 *           type: number
 *           format: double
 *           description: Vĩ độ (Latitude)
 *         start_lng:
 *           type: number
 *           format: double
 *           description: Kinh độ (Longitude)
 *         isActive:
 *           type: boolean
 *           description: Trạng thái hoạt động
 *       example:
 *         storeName: "Foody Gò Vấp"
 *         storeDescription: "Cơm tấm sườn bì chả ngon nhất vùng"
 *         storeLocation: "123 Phạm Văn Đồng, Gò Vấp, TP.HCM"
 *         logo: ["https://example.com/logo1.png", "https://example.com/logo2.png"]
 *         start_lat: 10.823099
 *         start_lng: 106.629664
 */

/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: API quản lý nhà hàng
 */

/**
 * @swagger
 * /api/restaurants:
 *   get:
 *     summary: Lấy danh sách tất cả nhà hàng
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 */
router.get('/', getAllRestaurants);

/**
 * @swagger
 * /api/restaurants/{id}:
 *   get:
 *     summary: Lấy chi tiết nhà hàng theo ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chi tiết nhà hàng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       404:
 *         description: Không tìm thấy
 */
router.get('/:id', getRestaurantById);

/**
 * @swagger
 * /api/restaurants:
 *   post:
 *     summary: Tạo mới nhà hàng
 *     tags: [Restaurants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       201:
 *         description: Tạo thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post('/', createRestaurant);

/**
 * @swagger
 * /api/restaurants/{id}:
 *   put:
 *     summary: Cập nhật thông tin nhà hàng
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy
 */
router.put('/:id', updateRestaurant);

/**
 * @swagger
 * /api/restaurants/{id}:
 *   delete:
 *     summary: Xóa nhà hàng
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy
 */
router.delete('/:id', deleteRestaurant);

module.exports = router;