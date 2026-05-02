const pool = require('../db')

const getStaff = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, name, email, role, created_at FROM users WHERE role = $1',
            ['admin']
        )
        res.json(result.rows)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = getStaff