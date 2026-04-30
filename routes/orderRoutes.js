const express = require('express')
const router = express.Router()
const { protect, adminOnly } = require('../middlewares/authMiddleware')

const placeOrder = require('../controllers/placeOrder')
const getOrders = require('../controllers/getOrders')
const updateOrderStatus = require('../controllers/updateOrderStatus')

// Customer and admin routes
router.post('/', protect, placeOrder)
router.get('/', protect, getOrders)

// Admin only routes
router.put('/:id/status', protect, adminOnly, updateOrderStatus)

module.exports = router