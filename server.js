const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Welcome to your server"});
});

app.get('/api/players', (req, res) => {
    res.json({ message: 'GET: retrieve all players'});
});

app.get('/api/players/:id', (req, res) => {
    res.json({ message: `GET: retrieve players with ID ${req.params.id}`});
});

app.post('/api/players', (req, res) => {
    const newPlayer = req.body;
    res.json({message: 'POST: create new player', data: newPlayer});
})

app.put('/api/players/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    res.json({message: `PUT: Update Player ${id}`, data: updatedData})
})

app.delete('/api/players/:id', (req,res) => {
    const id = req.params.id;
    res.json({ message: `DELETE: Remove player ${id}`});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running on port 5000');
})