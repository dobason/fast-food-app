const express = require('express');
const router = express.Router();
const droneController = require('../controllers/droneController');


/**
 * @swagger
 * components:
 *  schemas:
 *    Drone:
 *      type: object
 *      required:
 *        - droneId
 *        - current_lat
 *        - current_lng
 *        - store_lat
 *        - store_lng
 *        - max_payload_kg
 *        - max_range_km
 *      properties:
 *        droneId:
 *          type: string
 *          description: ID định danh duy nhất của Drone
 *        battery:
 *          type: number
 *          description: % Pin còn lại (0-100)
 *        current_lat:
 *          type: number
 *          format: double
 *        current_lng:
 *          type: number
 *          format: double
 *        store_lat:
 *          type: number
 *          format: double
 *        store_lng:
 *          type: number
 *          format: double
 *        max_payload_kg:
 *          type: number
 *          description: Tải trọng tối đa (kg)
 *        max_range_km:
 *          type: number
 *          description: Tầm hoạt động tối đa (km)
 *        status:
 *          type: string
 *          enum: [IDLE, DELIVERING, RETURNING, CHARGING, MAINTENANCE, OFFLINE]
 *      example:
 *        droneId: "DRONE-001"
 *        battery: 95.5
 *        current_lat: 21.0285
 *        current_lng: 105.8542
 *        store_lat: 21.0285
 *        store_lng: 105.8542
 *        max_payload_kg: 5.0
 *        max_range_km: 20.0
 *        status: "IDLE"
 */

/**
 * @swagger
 * tags:
 *  name: Drones
 *  description: API quản lý Drone
 */

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