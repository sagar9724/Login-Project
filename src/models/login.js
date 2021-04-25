const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    cpassword: {
        type: String,
        required: true,
        unique: true,
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
});

userSchema.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({_id:this._id.toString()},process.env.SECRET);
        this.tokens = this.tokens.concat({token:token});
        await this.save();   
        console.log(token);
        return token;
    }catch(err)
    {
        res.send("The error part "+ err)
        console.log("The error part "+ err)
    }
}


userSchema.pre("save", async function (next) {

    if (this.isModified("password")) {

        this.password = await bcrypt.hash(this.password, 10);
        this.cpassword = await bcrypt.hash(this.cpassword, 10);
        
        // this.cpassword = undefined;
    }


    next();
});

const User = new mongoose.model("User", userSchema)

module.exports = User;