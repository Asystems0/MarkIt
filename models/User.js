const mongoose = require('mongoose');
const arrayUniquePlugin = require('mongoose-unique-array');

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
            required: [true, 'Must provide name'],
            trim: true,
            unique: [true, 'Duplicate name'],
            maxlength: [30, 'name can not be more then 20 characters'],
        },
        complited: {
            type: Boolean,
            default: false,
        },date: {
            type: Date,
            default: Date.now()
        }

    }],
    date: {
        type: Date,
        default: Date.now()
    }
});
userSchema.plugin(arrayUniquePlugin);
module.exports = mongoose.model('User', userSchema);