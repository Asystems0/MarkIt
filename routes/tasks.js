const router = require('express').Router();
const { verify } = require('./verifyToken');
const User = require('../models/User');

router.get('/', verify, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user._id});
        res.status(200).json({userName: user.name, tasks: user.tasks, complitedTasks: user.complitedTasks});
    } catch (err) {
        res.status(400).json({message: err});
    }
});

router.patch('/addTask', verify, async (req, res) => {
    const data = {
        name: req.body.name, 
        };

        try {
            const user = await User.findOne({_id: req.user._id});
            await user.tasks.push(data);
            const savedUser = await user.save();
            res.status(200).json({res: savedUser});
        } catch (err) {
            console.log(err);
            res.status(400).json({ msg: err.message});
        }
});

router.delete('/delTask', verify, async (req, res) => {

    try {
        const user = await User.findOne({_id: req.user._id}); 
        const del = await user.tasks.pull({_id: req.body.taskId}); //Delete task by ID
        await user.save();
        res.status(200).json({taskToDel: del});

    } catch (err) {
        res.status(400).json({ msg: err});
    }
    
});

router.patch('/editTaskName', verify, async (req, res) => {

    try {
        const user = await User.findOne({_id: req.user._id});
        const task = await user.tasks.id(req.body.taskId);
        task['name'] = await req.body.name;

        res.status(200).json({res: user.tasks.id(req.body.taskId)});

    } catch (err) {
        console.log(err);
        res.status(400).json({ msg: err.message});
    }
});

router.patch('/taskComplited', verify, async (req, res) => {

    try {
        const user = await User.findOne({_id: req.user._id});
        const task = await user.tasks.id(req.body.taskId);
        if(!task) return res.status(400).send('Task not found'); //Check if task exist

        await user.complitedTasks.push(task); //Add task to complitedTasks array by _id
        await user.tasks.pull(task); //Delete task from tasks array by ID
        const savedUser = await user.save()
        res.status(200).json({res: "Task back to 'complitedTasks' array", user: savedUser});

    } catch (err) {
        console.log(err);
        res.status(400).json({ msg: err.message});
    }
});

router.patch('/reTask', verify, async (req, res) => {

    try {
        const user = await User.findOne({_id: req.user._id});
        const task = await user.complitedTasks.id(req.body.taskId);
        if(!task) return res.status(400).send('Task not found'); //Check if task exist

        await user.tasks.push(task); //Add task to complitedTasks array by _id
        await user.complitedTasks.pull(task); //Delete task from tasks array by ID
        const savedUser = await user.save()
        res.status(200).json({res: "Task back to 'tasks' array", user: savedUser});

    } catch (err) {
        console.log(err);
        res.status(400).json({ msg: err.message});
    }
});

module.exports = router;