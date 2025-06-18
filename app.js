const express = require('express');
const app=express();
const userRouter = require('./routes/user.routes');
const dotenv = require('dotenv');
dotenv.config();
const connectToDB = require('./config/db');
connectToDB();

const cookieParser = require('cookie-parser');


app.set('view engine','ejs');

app.use(cookieParser());//cookie parser 

app.use(express.json());
app.use(express.urlencoded({extended:true})); 

app.use('/user',userRouter);



app.listen(4000,()=>{
    console.log("Server started at Port 4000");
})