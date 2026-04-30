const express = require('express')
const router = express.Router()
const { protect, adminOnly } = require('../middlewares/authMiddleware')

const getCategories = require('../controllers/getCategories')
const createCategory = require('../controllers/createCategory')
const deleteCategory = require('../controllers/deleteCategory')

// Public routes
router.get('/', getCategories)

// Admin only routes
router.post('/', protect, adminOnly, createCategory)
router.delete('/:id', protect, adminOnly, deleteCategory)

module.exports = router