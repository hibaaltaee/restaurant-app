const pool = require('../db')

const deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params

        // Check if menu item exists
        const menuItem = await pool.query(
            'SELECT * FROM menu_items WHERE id = $1',
            [id]
        )

        if (menuItem.rows.length === 0) {
            return res.status(404).json({ message: 'Menu item not found' })
        }

        // Delete menu item
        await pool.query(
            'DELETE FROM menu_items WHERE id = $1',
            [id]
        )

        res.json({ message: 'Menu item deleted successfully' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = deleteMenuItem