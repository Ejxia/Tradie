const PORT = process.env.PORT ?? 8000
const express = require('express')
const app = express()
const pool = require('./db')
const cors = require('cors')
const bcrypt = require('bcrypt')

app.use(cors())
app.use(express.json())



// Get todos
app.get('/todos/:userEmail', async (req, res) => {
    const { userEmail } = req.params
    
    try {
        const management = await pool.query('SELECT * FROM membership WHERE email = $1', [userEmail])
        res.json(management.rows)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Server error' })
    }
})

// Sign up
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body
    
    try {
        // Check if user already exists
        const userExists = await pool.query('SELECT * FROM users WHERE email ILIKE $1', [email])
        
        if (userExists.rows.length > 0) {
            return res.status(409).json({ error: 'User already exists' })
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Insert new user
        const newUser = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        )

        res.status(201).json({ message: 'User created successfully', user: newUser.rows[0] })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Server error during registration' })
    }
})

// User Details
app.post('/user-details', async (req, res) => {
    const { email, firstName, lastName, dateOfBirth, jobType, licenseNumber, licenseExpiry } = req.body
    
    try {
        // Insert user details
        const newUserDetails = await pool.query(
            'INSERT INTO user_details (email, first_name, last_name, date_of_birth, job_type, license_number, license_expiry) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [email, firstName, lastName, dateOfBirth, jobType, licenseNumber, licenseExpiry]
        )

        res.status(201).json({ message: 'User details submitted successfully', userDetails: newUserDetails.rows[0] })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Server error' })
    }
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
