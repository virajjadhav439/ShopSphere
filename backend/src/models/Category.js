const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        maxlength:50,
    },
    slug:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
    },
    description:{
        type:String,
        required:false,
        maxlength:300,
    },
    image:{
        type:String,
        required:false,
    },
    parentCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:false,
        default:null
    },
    isActive:{
        type:Boolean,
        default:true,
        required:true
    },
},{
    timestamps:true,
})

const Category = mongoose.model("Category",categorySchema)

module.exports = Category