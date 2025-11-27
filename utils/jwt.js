const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config();

const generateToken = (playerId) => {
    return jwt.sign(
        {id: playerId}, 
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE}        
    );
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;   
    }
}

module.exports = { generateToken, verifyToken }