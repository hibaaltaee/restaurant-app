const pool = require('../db')

const getOrders = async (req, res) => {
    try {
        let result

        // If admin get all orders, if customer get only their orders
        if (req.user.role === 'admin') {
            result = await pool.query(`
                SELECT 
                    orders.id,
                    orders.status,
                    orders.total,
                    orders.created_at,
                    users.name AS customer_name,
                    users.email AS customer_email
                FROM orders
                JOIN users ON orders.user_id = users.id
                ORDER BY orders.created_at DESC
            `)
        } else {
            result = await pool.query(`
                SELECT 
                    orders.id,
                    orders.status,
                    orders.total,
                    orders.created_at
                FROM orders
                WHERE orders.user_id = $1
                ORDER BY orders.created_at DESC
            `, [req.user.id])
        }

        res.json(result.rows)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = getOrders