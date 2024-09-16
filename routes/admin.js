const express = require('express');
const router = express.Router();
const User = require('../modals/User'); 
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Admin routes
router.get('/dashboard', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        // Optionally, you might want to limit what data is returned
        const users = await User.find({ role: 'admin' }); // Adjust query based on needs
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
