const mongoose = require("../lib/db");
var User = mongoose.model('users',{
        user_name: {
            type: String,
            unique: true
        }, 
        user_email: {
            type: String,
            unique: true
        }, 
        user_pass: String
    }
);
module.exports = User;