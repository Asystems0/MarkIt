const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT, 
    () => console.log("Connected to DB!"));

const PORT = 3000;

//Middleware
app.use(express.json());

//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
app.use('/user', authRoute);
app.use('/post', postRoute);


app.get('/', (req, res) => {
    res.send("hello");
});


app.listen(PORT, () => console.log(`Server up and running in: http://localhost:${PORT}`));