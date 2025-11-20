const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [20, 'Username cannot exceed 20 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+.\S+$/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must at least be 6 characters']
    }, 
    score: {
        type: Number,
        default: 0,
        min: [0, 'Score cannot be negative']
    }
}, {
    timestamps: true // adds created at and updated at fields
});

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;