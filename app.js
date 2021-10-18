const express = require('express');
const app = express();
const connectDB = require('./db/connect');

// const dotenv = require('dotenv');
// const mongoose = require('mongoose');

// dotenv.config();

// mongoose.connect(
//     process.env.DB_CONNECT, 
//     () => console.log("Connected to DB!"));

const PORT =process.env.PORT || 3000;

//Middleware
app.use(express.static('./public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>HELLO</h1><a href="/tasks/">Get all tasks</a>');
});

//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
const taskRoute = require('./routes/task');
const tasksRoute = require('./routes/tasks');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
app.use('/user', authRoute);
app.use('/post', postRoute);
app.use('/task', taskRoute);
app.use('/tasks', tasksRoute);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => console.log(`Server up and running in: http://localhost:${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();