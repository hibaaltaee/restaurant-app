const pool = require('../db')

const updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params
        const { name, description, price, image, available, category_id } = req.body

        // Check if menu item exists
        const menuItem = await pool.query(
            'SELECT * FROM menu_items WHERE id = $1',
            [id]
        )

        if (menuItem.rows.length === 0) {
            return res.status(404).json({ message: 'Menu item not found' })
        }

        // Update menu item
        const result = await pool.query(`
            UPDATE menu_items
            SET 
                name = $1,
                description = $2,
                price = $3,
                image = $4,
                available = $5,
                category_id = $6
            WHERE id = $7
            RETURNING *
        `, [name, description, price, image, available, category_id, id])

        res.json(result.rows[0])

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = updateMenuItem