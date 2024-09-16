const express = require('express');
const router = express.Router();
const User = require('../modals/User');  // Committee leaders are users with a specific role
const Tournament = require('../modals/Tournament');  // Tournament model to handle tournament data
const authMiddleware = require('../middleware/authMiddleware');

// Admin route: Get all committee leaders
router.get('/committee-leaders', authMiddleware(['admin']), async (req, res) => {
    try {
        const committeeLeaders = await User.find({ role: 'committee leader' });
        res.json(committeeLeaders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Admin route: Get all tournaments registered by committee leaders
router.get('/tournaments', authMiddleware(['admin']), async (req, res) => {
    try {
        const tournaments = await Tournament.find({});
        res.json(tournaments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Admin route: Manage subscriptions (e.g., view subscription expiry)
router.get('/subscriptions', authMiddleware(['admin']), async (req, res) => {
    try {
        const subscriptions = await Tournament.find({ subscriptionActive: true });
        res.json(subscriptions);  // You may want to include expiry dates in the response
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Admin route: Expire or delete a tournament (Manual admin control)
router.delete('/tournament/:id', authMiddleware(['admin']), async (req, res) => {
    try {
        const { id } = req.params;
        await Tournament.findByIdAndDelete(id);
        res.json({ msg: 'Tournament deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Optionally, expire tournament (without deletion) by setting active = false
router.put('/tournament/:id/expire', authMiddleware(['admin']), async (req, res) => {
    try {
        const { id } = req.params;
        const tournament = await Tournament.findById(id);
        if (!tournament) {
            return res.status(404).json({ msg: 'Tournament not found' });
        }
        tournament.active = false;  // Mark the tournament as expired
        await tournament.save();
        res.json({ msg: 'Tournament expired' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
