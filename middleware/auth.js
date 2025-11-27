const { verifyToken } = require('../utils/jwt');
const Player = require('../models/Player');

exports.protect = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token){
        return res.status(401).json({
            success: false,
            message: 'Not authorized. Please Login First'
        });
    }

    try {
        const decoded = verifyToken(token);

        if(!decoded){
            return res.status(401).json({
            success: false,
            message: `Player not found`
        });
        }

        const player = await Player.findById(decoded.id).select('-password');

        if(!player){
            return res.status(404).json({
            success: false,
            message: 'Player not found'
        });
        }

        req.player = player;
        next();
    } catch (error){
        return res.status(401).json({
            success: false,
            message: 'Not authorized',
            error: error.message
        })
    }
};