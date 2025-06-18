const mongoose = require('mongoose');

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:[3,'min length should be 3'],
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        
        trim:true,
    },
});

const userModel=mongoose.model('user',userSchema);

module.exports=userModel;