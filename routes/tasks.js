const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../models/User');

router.get('/', verify, async (req, res) => {
    // console.log(req.user._id);
    // res.send(req.user._id);
    // const user = User.findOne({_id: req.user._id});
    const user = await User.findOne({_id: req.user._id});
    console.log(user.tasks);
    res.send(user);

    
    })

module.exports = router;