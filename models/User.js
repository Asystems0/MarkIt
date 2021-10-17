const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 255,
        min: 8
    },
    password: {
        type: String,   
        required: true,
        max: 1024,
        min: 8
    },
    tasks: [{
        name: {
            type: String,
            required: [true, 'must provide name'],
            trim: true,
            maxlength: [20, 'name can not be more then 20 characters'],
        },
        complited: {
            type: Boolean,
            default: false,
        }
    }],
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('User', userSchema);