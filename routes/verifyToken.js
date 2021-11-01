const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports.verify = (req, res, next) => {
    const token = req.cookies.jwt;
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(verified._id);
        // console.log(token);
        req.user = verified;
        res.cookie('jwt', token, { httpOnly: true, maxAge: 10000 * 60 * 15});
        next();
    } catch (err){
        res.status(400).send('Invalid Token');
    }
};

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, process.env.TOKEN_SECRET,  async (err, decodeToken) => {
            if (err){
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log(decodeToken);
                let user = await User.findById(decodeToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}