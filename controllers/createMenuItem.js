const pool = require('../db')

const createMenuItem = async (req, res) => {
    try {
        const { name, description, price, image, category_id } = req.body

        // Check if category exists
        const categoryExists = await pool.query(
            'SELECT * FROM categories WHERE id = $1',
            [category_id]
        )

        if (categoryExists.rows.length === 0) {
            return res.status(404).json({ message: 'Category not found' })
        }

        // Create menu item
        const result = await pool.query(`
            INSERT INTO menu_items 
                (name, description, price, image, category_id) 
            VALUES 
                ($1, $2, $3, $4, $5) 
            RETURNING *
        `, [name, description, price, image, category_id])

        res.status(201).json(result.rows[0])

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = createMenuItem