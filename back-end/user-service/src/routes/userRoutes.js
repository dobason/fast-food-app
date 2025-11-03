const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes
router.get('/profile', authMiddleware, userController.profile);

// Admin routes
router.get('/all-users', authMiddleware, roleMiddleware('admin'), userController.getAllUsers);

// Merchant routes
router.get('/my-store', authMiddleware, roleMiddleware('merchant'), userController.getMerchantStore);

module.exports = router;
