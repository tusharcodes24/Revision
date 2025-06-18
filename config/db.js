const mongoose = require('mongoose');

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('Connected to DB');
    }).catch((err)=>{
        console.log('Connection to DB failed',err);
    })
}

module.exports=connectToDB;