const express = require('express');
const router = express.Router();
const { register, login, getMe} = require('../controllers/authController');
const { updateScore} = require('../controllers/playerController');
const { protect } = require('../middleware/auth');

//Public routes
router.post('/register', register);
router.post('/login', login);

//private routes

router.get('/me', protect, getMe);
router.post('/score', protect, updateScore);

module.exports = router;