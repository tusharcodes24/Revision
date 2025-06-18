const express = require('express');
const router=express.Router();
const { body,validationResult } = require('express-validator');
const userModel = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/register',(req,res)=>{
    res.render('register');
});

router.post('/register',

    //middlewares (thirdParty)
    body('email').trim().isEmail().isLength({min:3}),
    body('username').trim().isLength({min: 3}),
    body('password').isLength({min:3}),

    // callback function
    async(req,res)=>{
        const errors=validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message:'Invalid Data',
            });
        }
        const{username,email,password}=req.body;
        const hashedPassword=await bcrypt.hash(password,10);

        const newUser=await userModel.create({
            username,
            email,
            password:hashedPassword,
        });
        res.send(newUser);
});

router.get('/login',(req,res)=>{
    res.render('login');
})

router.post('/login',
    body('username').trim(),
    body('password'),
    async(req,res)=>{
        const error=validationResult(req);

        if(!error.isEmpty()){
            return res.status(401).json({
                error:error.array(),
                message:"Invalid Data",
            })
        }

        const {username, password}=req.body
        const user=await userModel.findOne({
            username:username
        })

        if(!user){
            return res.status(401).json({
                message:"Incorrect Username of Passsword",
            })
        }

        const isMatch= await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({
                message:"Incorrect Username of Passsword",
            })
        }

        const token=jwt.sign({
            userId:user._id,
            username:user.username,
            email:user.email,
        },
        process.env.JWT_SECRET
        );

        res.cookie('token',token);

        res.send('Logged In');

    }
)

module.exports=router;