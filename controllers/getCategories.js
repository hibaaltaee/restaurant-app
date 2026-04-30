const pool = require('../db')

const getCategories = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM categories ORDER BY id ASC'
        )

        res.json(result.rows)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = getCategories