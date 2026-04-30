const pool = require('../db')

const createCategory = async (req, res) => {
    try {
        const { name } = req.body

        // Check if category exists
        const categoryExists = await pool.query(
            'SELECT * FROM categories WHERE name = $1',
            [name]
        )

        if (categoryExists.rows.length > 0) {
            return res.status(400).json({ message: 'Category already exists' })
        }

        const result = await pool.query(
            'INSERT INTO categories (name) VALUES ($1) RETURNING *',
            [name]
        )

        res.status(201).json(result.rows[0])

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = createCategory