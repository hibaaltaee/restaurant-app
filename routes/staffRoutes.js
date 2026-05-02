const express = require('express')
const router = express.Router()
const { protect, adminOnly } = require('../middlewares/authMiddleware')

const getStaff = require('../controllers/getStaff')
const createStaff = require('../controllers/createStaff')
const deleteStaff = require('../controllers/deleteStaff')

router.get('/', protect, adminOnly, getStaff)
router.post('/', protect, adminOnly, createStaff)
router.delete('/:id', protect, adminOnly, deleteStaff)

module.exports = router