const jwt = require('jsonwebtoken');
// var crypto = require("crypto");

module.exports = function(req, res, next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(verified._id);
        // console.log(token);
        req.user = verified;
        next();
    } catch (err){
        res.status(400).send('Invalid Token');
    }
};