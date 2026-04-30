const pool = require('../db')

const placeOrder = async (req, res) => {
    try {
        const { items } = req.body
        const user_id = req.user.id

        // items = [{ menu_item_id: 1, quantity: 2 }, ...]

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No items in order' })
        }

        // Calculate total
        let total = 0
        for (const item of items) {
            const menuItem = await pool.query(
                'SELECT * FROM menu_items WHERE id = $1 AND available = true',
                [item.menu_item_id]
            )

            if (menuItem.rows.length === 0) {
                return res.status(404).json({ 
                    message: `Menu item ${item.menu_item_id} not found or unavailable` 
                })
            }

            total += menuItem.rows[0].price * item.quantity
        }

        // Create order
        const order = await pool.query(
            'INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING *',
            [user_id, total]
        )

        const order_id = order.rows[0].id

        // Create order items
        for (const item of items) {
            const menuItem = await pool.query(
                'SELECT * FROM menu_items WHERE id = $1',
                [item.menu_item_id]
            )

            await pool.query(
                'INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES ($1, $2, $3, $4)',
                [order_id, item.menu_item_id, item.quantity, menuItem.rows[0].price]
            )
        }

        // Return order with items
        const orderItems = await pool.query(`
            SELECT 
                order_items.id,
                menu_items.name,
                order_items.quantity,
                order_items.price
            FROM order_items
            JOIN menu_items ON order_items.menu_item_id = menu_items.id
            WHERE order_items.order_id = $1
        `, [order_id])

        res.status(201).json({
            order: order.rows[0],
            items: orderItems.rows
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = placeOrder