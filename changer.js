const dotenv = require('dotenv');
var crypto = require("crypto");

dotenv.config();


var id = crypto.randomBytes(20).toString('hex');
console.log(id);


const a = Math.floor(Math.random() * 10000000);
console.log(a);
console.log(process.env.TOKEN_SECRET);
// process.env.TOKEN_SECRET = 1
process.env['TOKEN_SECRET'] = 'production';
console.log(process.env.TOKEN_SECRET);