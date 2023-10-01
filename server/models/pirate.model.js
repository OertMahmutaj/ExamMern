const mongoose = require('mongoose');

const pirateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    treasureChests: {
        type: Number,
        required: true,
    },
    catchPhrase: {
        type: String,
        required: true,
    },
    crewPosition: {
        type: String,
        enum: ['First Mate', 'Quarter Master', 'Boatswain', 'Powder Monkey', 'Captain'],
        required: true,
    },
    isCaptain: {
        type: Boolean,
        default: false,
    },
    hasPegLeg: {
        type: Boolean,
        default: true,
    },
    hasEyePatch: {
        type: Boolean,
        default: true,
    },
    hasHookHand: {
        type: Boolean,
        default: true,
    },
    
}, { timestamps: true });

module.exports = mongoose.model('Pirate', pirateSchema);
