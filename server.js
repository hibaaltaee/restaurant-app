const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const db = require('./db')

const app = express()

// CORS config
app.use(cors({
    origin: [
        'http://localhost:5173',
        process.env.FRONTEND_URL
    ],
    credentials: true
}))

app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/menu', require('./routes/menuRoutes'))
app.use('/api/categories', require('./routes/categoryRoutes'))
app.use('/api/orders', require('./routes/orderRoutes'))
app.use('/api/staff', require('./routes/staffRoutes'))

app.get('/', (req, res) => {
    res.json({ message: 'Restaurant API is running! 🍕' })
})

// Export for serverless
module.exports = app

// Start server locally
if (require.main === module) {
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`)
    })
}