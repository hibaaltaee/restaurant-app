const pool = require('../db')

const getMenuItems = async (req, res) => {
    try {
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
            ORDER BY menu_items.id ASC
        `)

        res.json(result.rows)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = getMenuItems