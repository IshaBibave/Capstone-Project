// routes/auth.js
const express = require('express');
const router = express.Router();
const UserSchema = require('../models/UserSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Signup route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await UserSchema.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        
        user = new UserSchema({
            username,
            email,
            password
        });

        await user.save();
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            'yourSecretKey', // Replace with your secret key
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ token, message: 'User signed up successfully', success: true });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await UserSchema.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            'yourSecretKey', // Replace with your secret key
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ token, message: 'user logged in successfully', success: true, username: user.username });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
