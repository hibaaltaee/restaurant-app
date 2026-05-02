const pool = require('../db')

const deleteStaff = async (req, res) => {
    try {
        const { id } = req.params

        // Prevent deleting yourself
        if (parseInt(id) === req.user.id) {
            return res.status(400).json({ message: 'Cannot delete your own account' })
        }

        const user = await pool.query(
            'SELECT * FROM users WHERE id = $1 AND role = $2',
            [id, 'admin']
        )

        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'Staff not found' })
        }

        await pool.query('DELETE FROM users WHERE id = $1', [id])

        res.json({ message: 'Staff deleted successfully' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = deleteStaff