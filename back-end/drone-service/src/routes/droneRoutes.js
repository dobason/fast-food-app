const express = require('express');
const router = express.Router();
const droneController = require('../controllers/droneController');

/**
 * @swagger
 * /api/drones:
 *  get:
 *    summary: Lấy danh sách tất cả Drone
 *    tags: [Drones]
 *    responses:
 *      200:
 *        description: Danh sách các Drone
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Drone'
 */
router.get('/', droneController.getAllDrones);

/**
 * @swagger
 * /api/drones/{id}:
 *  get:
 *    summary: Lấy thông tin Drone theo ID
 *    tags: [Drones]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Chi tiết Drone
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Drone'
 *      404:
 *        description: Không tìm thấy Drone
 */
router.get('/:id', droneController.getDroneById);

/**
 * @swagger
 * /api/drones:
 *  post:
 *    summary: Tạo mới Drone
 *    tags: [Drones]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Drone'
 *    responses:
 *      201:
 *        description: Tạo Drone thành công
 *      400:
 *        description: Dữ liệu không hợp lệ
 */
router.post('/', droneController.createDrone);

/**
 * @swagger
 * /api/drones/{id}:
 *  put:
 *    summary: Cập nhật thông tin Drone
 *    tags: [Drones]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Drone'
 *    responses:
 *      200:
 *        description: Cập nhật Drone thành công
 *      404:
 *        description: Không tìm thấy Drone
 */
router.put('/:id', droneController.updateDrone);

/**
 * @swagger
 * /api/drones/{id}:
 *  delete:
 *    summary: Xóa Drone
 *    tags: [Drones]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Xóa Drone thành công
 *      404:
 *        description: Không tìm thấy Drone
 */
router.delete('/:id', droneController.deleteDrone);

module.exports = router;
