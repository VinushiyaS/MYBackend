const mongoose = require('mongoose');

const TournamentSchema = new mongoose.Schema({
    committeeLeaderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tournamentName: { type: String, required: true },
    subscriptionActive: { type: Boolean, default: true },
    expiryDate: { type: Date, required: true },  // For managing subscription expiry
    active: { type: Boolean, default: true },  // For manual expiration
}, { timestamps: true });

module.exports = mongoose.model('Tournament', TournamentSchema);
