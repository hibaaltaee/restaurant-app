const pool = require('../db')

const getSingleMenuItem = async (req, res) => {
    try {
        const { id } = req.params

        const result = await pool.query(`
            SELECT 
                menu_items.id,
                menu_items.name,
                menu_items.description,
                menu_items.price,
                menu_items.image,
                menu_items.available,
                categories.name AS category
            FROM menu_items
            JOIN categories ON menu_items.category_id = categories.id
            WHERE menu_items.id = $1
        `, [id])

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Menu item not found' })
        }

        res.json(result.rows[0])

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = getSingleMenuItem