// In backend/routes/auth.js

const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// POST /api/users/register - Signup Endpoint
router.post('/register', registerUser);

// POST /api/users/login - Login Endpoint
router.post('/login', loginUser);

module.exports = router;
