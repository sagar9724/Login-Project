const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    cpassword:{
        type:String,
        required:true,
        unique:true,
    },
});

const User = new mongoose.model("User",userSchema)

module.exports = User;