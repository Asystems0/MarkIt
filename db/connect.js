const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const connectDB = () => {return mongoose.connect(process.env.DB_CONNECT)};

module.exports = connectDB; 