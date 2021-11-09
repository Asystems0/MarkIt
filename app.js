const express = require('express');
const app = express();
const connectDB = require('./server/database/connect');
const path = require("path");
const cookieParser = require('cookie-parser');
const {checkUser} = require('./server/routes/verifyToken');

const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.static(__dirname));
app.use(express.json());
app.use(cookieParser());

app.get('*', checkUser);
app.post('*', checkUser);

//Import Routes

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

const authRoute = require('./server/routes/auth');
const tasksRoute = require('./server/routes/tasks');
const notFound = require('./server/middleware/not-found');
const errorHandlerMiddleware = require('./server/middleware/error-handler');

app.use('/user', authRoute);
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