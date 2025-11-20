const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const playerRoutes = require('./routes/playerRoutes');


dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Successfully connected to Database'))
.catch((err) => console.error(`MongoDB error ${err}`));

const app = express();
app.use(express.json());

app.use('/api/players', playerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running on port 5000');
})