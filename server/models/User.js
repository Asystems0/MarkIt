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
    categories: [
        {
            type: String,
            trim: true,
            unique: [true, 'Duplicate values'],
            maxlength: [30, 'name can not be more then 30 characters'],
        }],
    allTasks: [
        {
            category:{
                type: String,
                required: [true, 'Must provide category name'],
                trim: true,
                maxlength: [30, 'category can not be more then 30 characters'],  
            },
            name: {
                type: String,
                required: [true, 'Must provide name'],
                trim: true,
                unique: [true, 'Duplicate name'],
                maxlength: [30, 'name can not be more then 30 characters'],
            },
            complited: {
                type: Boolean,
                required: true,
                default: false,
            },
            dateStart: {
                type: Date,
                default: Date.now()
            },
            dateEnd: {
                type: Date,
                default: Date.now() + 7 * 24 * 60 * 60 * 1000
            }
        },
    ],

    date: {
        type: Date,
        default: Date.now()
    }
});
userSchema.plugin(arrayUniquePlugin);
module.exports = mongoose.model('User', userSchema);