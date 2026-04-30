const express = require('express')
const router = express.Router()
const { protect, adminOnly } = require('../middlewares/authMiddleware')

const getMenuItems = require('../controllers/getMenuItems')
const getSingleMenuItem = require('../controllers/getSingleMenuItem')
const createMenuItem = require('../controllers/createMenuItem')
const updateMenuItem = require('../controllers/updateMenuItem')
const deleteMenuItem = require('../controllers/deleteMenuItem')

// Public routes — anyone can see menu
router.get('/', getMenuItems)
router.get('/:id', getSingleMenuItem)

// Admin only routes
router.post('/', protect, adminOnly, createMenuItem)
router.put('/:id', protect, adminOnly, updateMenuItem)
router.delete('/:id', protect, adminOnly, deleteMenuItem)

module.exports = router