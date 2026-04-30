const pool = require('../db')

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params

        // Check if category exists
        const category = await pool.query(
            'SELECT * FROM categories WHERE id = $1',
            [id]
        )

        if (category.rows.length === 0) {
            return res.status(404).json({ message: 'Category not found' })
        }

        await pool.query(
            'DELETE FROM categories WHERE id = $1',
            [id]
        )

        res.json({ message: 'Category deleted successfully' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = deleteCategory