const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        minlength:8,
    },
    isVerified:{
        type:Boolean,
        required:false,
        default:false
    },
    role:{
        type:String,
        enum:["admin","customer"],
        default:"customer"
    },
    profilePic:{
        type:String,
        required:false,
        default:null
    },
    address:{
        type:String,
        required:false
    },
    phoneNumber:{
        type:String,
        required:false,
        default:null
    },
    lastLogin:{
        type:Date,
        required:false,
        default:null
    },
    authProvider:{
        type:String,
        enum:["local","google"],
        default:"local",
    }
},{
    timestamps:true,
})

const User = mongoose.model("User",userSchema)

module.exports = User