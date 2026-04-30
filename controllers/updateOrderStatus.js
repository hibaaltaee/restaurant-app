const pool = require('../db')

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body

        // Validate status
        const validStatuses = ['pending', 'preparing', 'ready', 'delivered', 'cancelled']
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ 
                message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` 
            })
        }

        // Check if order exists
        const order = await pool.query(
            'SELECT * FROM orders WHERE id = $1',
            [id]
        )

        if (order.rows.length === 0) {
            return res.status(404).json({ message: 'Order not found' })
        }

        // Update order status
        const result = await pool.query(
            'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        )

        res.json(result.rows[0])

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = updateOrderStatus