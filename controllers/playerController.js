const Player = require("../models/Player");


exports.createPlayer = async (req, res) => {
    try {
        const player = await Player.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Player Created Successfully',
            data: player
        });
    } catch(error){

        if(error.name == 'ValidationError'){
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: messages
            });
        }

        if(error.code === 11000){
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({
                success: false,
                message: `${field} already exists`
            });
        }
    }
}

exports.getAllPlayers = async (req, res) => {
    try {
        const player = await Player.find();
        res.status(200).json({
            success: true,
            count: player.length,
            data: player
        })
    } catch(error){
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
};

exports.getPlayerById = async (req, res) => {
    try {

        const id = req.params.id;
        const player = await Player.findById(id);
        if(!player){
            return res.status(404).json({
                success: false,
                message: "Player not found"
            });
        }

        res.status(200).json({
            success: true,
            data: player
        })
    } catch(error){
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
};

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

        const player = await Player.findOne ({username});
        if(!player || player.password !== password){
            res.status(400).json({
                success: false,
                message: 'Invalid Username or Password'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Login Successful',
            data: player
        });
    } catch(error){
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
};

exports.updateScore = async (req, res) => {
    try {
        const { score } = req.body;
        const id = req.player._id;
        
        const player = await Player.findById(id);
        if(!player){
            return res.status(404).json({
                success: false,
                message: "Player not found"
            });
        }

        player.score = score;
        if(score < 0) player.score = 0;

        await player.save();        

        res.status(200).json({
            success: true,
            data: player
        })
    } catch(error){
        res.status(500).json({
            success: false,
            message: 'Failed to Update Score',
            error: error.message
        })
    }
};



exports.deletePlayer = async (req, res) => {
    try {
        const id = req.params.id;
        const player = await Player.findByIdAndDelete(id);
        if(!player){
            return res.status(404).json({
                success: false,
                message: "Player not found"
            });
        }
        res.status(200).json({
            success: true,
            message: 'Player deleted successfully'
        })
    } catch(error){
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
};

