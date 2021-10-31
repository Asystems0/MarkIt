const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const cookieParser = require('cookie-parser');
const {checkUser} = require('./routes/verifyToken');

const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.static('./public'));
app.use(express.json());
app.use(cookieParser());

app.get('*', checkUser);
app.post('*', checkUser);

//Import Routes
const authRoute = require('./routes/auth');
const tasksRoute = require('./routes/tasks');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

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