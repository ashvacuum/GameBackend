const express = require('express');
const router = express.Router();

const { createPlayer, getAllPlayers, getPlayerById, login, updateScore, deletePlayer} = require('../controllers/playerController');

router.post('/register', createPlayer);
router.get('/', getAllPlayers);
router.get('/:id', getPlayerById);
router.post('/login', login);
router.post('/score/:id', updateScore);
router.delete('/:id', deletePlayer);

module.exports = router;