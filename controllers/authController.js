const Player = require('../models/Player');
const { generateToken, verifyToken } = require('../utils/jwt');


exports.register = async (req, res) => {
    try {
        const { username, email, password} = req.body;

        const existingPlayer = await Player.findOne({
             $or: [{ email }, { username }]
            });

        if(existingPlayer){
            return res.status(400).json({
                succes: false,
                message: 'Username or email already exists'
            });
        };

        const player = await Player.create({
            username,
            email,
            password,
            score: 0
        });

        const token = generateToken(player._id);
        const isValidToken = verifyToken(token);
        if(!isValidToken){
        res.status(400).json({
            success: false,
            message: "Invalid Token"
        });    
        }
        res.status(201).json({
            success: true,
            message: 'Player registered Successfully',
            token,
            data: {
                id: player._id,
                username: player.username,
                email: player.email,
                score: player.score
            }
        });
    } catch (error){
        if(error.name === 'ValidationError'){
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: messages
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}

exports.login = async (req, res) => {
    try {

        const { username, password } = req.body;

        if(!username || !password)
            {
            return res.status(400).json({
                success: false, 
                message: 'Please provide a valid username or password'
            });
        }

        const player = await Player.findOne({ username}).select('+password');

        if(!player){
            res.status(400).json({
                success: false,
                message: 'Invalid Username or Password'
            });
        }

        const isPasswordCorrect = await player.password === password;

        if(!isPasswordCorrect){
            res.status(401).json({
                succes: false,
                message: 'Invalid Username or Password'
            });
        }

        const token = generateToken(player._id);

        res.status(201).json({
            success: true,
            message: 'Player Login Successful',
            token,
            data: {
                id: player._id,
                username: player.username,
                email: player.email,
                score: player.score
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}

exports.getMe = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: req.player
        });
    } catch (error){
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}