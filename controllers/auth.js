const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {registerValidtaion, loginValidtaion} = require('../models/validation');
const bcrypt = require('bcryptjs');
// const { db } = require('../models/User');
// const { verify } = require('../routes/verifyToken');


module.exports.addUser = async (req, res) => {

    //VALIDATE THE DATA BEFORE WE A USER
    const { error } = registerValidtaion(req.body);
    // console.log(error.details[0].message);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email alreadt exists');

    //Hash the passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        categories: ['develop', 'work', 'sport'],
        allTasks: [
            {
                name: "Create rest API",
                category: 'develop',
                complited: false
            },
            {
                name: "Build HTML page",
                category: 'develop',
                complited: false
            },
            {
                name: "Design with css",
                category: 'develop',
                complited: false
            },
            {
                name: "Add box for edit",
                category: 'develop',
                complited: false
            },
            {
                name: "Add validtion login page",
                category: 'develop',
                complited: false
            },
            {
                name: "Add validtion register page",
                category: 'develop',
                complited: false
            },
            {
                name: "Fix token problem",
                category: 'develop',
                complited: true
            },
            {
                name: "Fix refresh broblem",
                category: 'develop',
                complited: true
            },
            {
                name: "Write CV",
                category: 'work',
                complited: false
            },
            {
                name: "New job",
                category: 'work',
                complited: false
            },
        ]
    });

    try{
        const savedUser = await user.save();
        console.log("Added");
        //Create and assign a token
        const token = await jwt.sign(
            {_id: savedUser._id},
            process.env.TOKEN_SECRET,
            {expiresIn: "1h"});
        res.cookie('jwt', token, { httpOnly: true, maxAge: 10000 * 60 * 15});
        res.status(200).json({user: user._id});
        
    } catch(err){
        console.log(err);
        res.status(400).send(err);
    }
};

module.exports.logIn = async (req, res) => {

    console.log("IN");
    //VALIDATE THE DATA BEFORE WE A USER
    const { error } = loginValidtaion(req.body);
    if(error) return res.status(400).send(error.details[0].message);

        //Checking if the email exists  
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send('Email is not found');

        //PASWORD IS CORRECT
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send('Invalid password');
        
        //Create and assign a token
        const token = await jwt.sign(
            {_id: user._id},
            process.env.TOKEN_SECRET,
            {expiresIn: "1h"});

        console.log(token);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 10000 * 60 * 15});
        res.status(200).json({user: user._id});
        
        // res.header('auth-token', token).send({userId: user._id, token: token, tasks: user.tasks});
};

module.exports.logOut = async (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}

module.exports.changepass = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user._id});
        console.log(user.password);
        //CEACK IF PASWORD IS CORRECT
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send('Invalid password');

        //Hash the passwords
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
        
        user.password = hashedPassword;
        const saveduser = await user.save();
        res.status(200).json({user: saveduser});
    } catch (err) {
        res.status(400).json({msg: err});
    }
};