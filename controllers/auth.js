const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {registerValidtaion, loginValidtaion} = require('../models/validation');
const bcrypt = require('bcryptjs');
const { db } = require('../models/User');


module.exports.addUser = async (req, res) => {

    //VALIDATE THE DATA BEFORE WE A USER
    const { error } = registerValidtaion(req.body);
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
        tasks: []
    });

    try{
        const savedUser = await user.save();
        res.json({ wellcome: req.body.name, savedUser});
    } catch(err){
        res.status(400).send(err);
    }
};

module.exports.logIn = async (req, res) => {

    //VALIDATE THE DATA BEFORE WE A USER
    const { error } = loginValidtaion(req.body);
    if(error) return res.status(400).send(error.details[0].message);

        //Checking if the email exists  
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send('Email is not found');

        //PPASWORD IS CORRECT
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send('Invalid password');

        //Create and assign a token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        // console.log(token);
        res.header('auth-token', token).send({token: token, tasks: user.tasks});
};