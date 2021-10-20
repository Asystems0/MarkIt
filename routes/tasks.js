const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../models/User');

router.get('/', verify, async (req, res) => {
    // console.log(req.user._id);
    // res.send(req.user._id);
    // const user = User.findOne({_id: req.user._id});
    const user = await User.findOne({_id: req.user._id});
    // console.log(user.tasks);
    res.send(user);

    
    })

router.patch('/', verify, async (req, res) => {
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

router.delete('/', verify, async (req, res) => {

    try {
        const user = await User.findOne({_id: req.user._id}); 
        const del = await user.tasks.pull({_id: req.body.taskId}); //Delete task by ID
        await user.save();
        res.status(200).json({taskToDel: del});

    } catch (err) {
        res.status(400).json({ msg: err});
    }
    
});

// router.patch('/up', verify, async (req, res) => {
//     const data = {
//         name: req.body.name, 
//         };

//         try {
//             const user = await User.findOne({_id: req.user._id});
//             await user.tasks.push(data);
//             const savedUser = await user.save();
//             res.status(200).json({res: savedUser});
//         } catch (err) {
//             console.log(err);
//             res.status(400).json({ msg: err.message});
//         }
// });

module.exports = router;