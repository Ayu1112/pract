const express= require('express');

const userRouter=express.Router();

const {userModel}=require("../models/user.model");

const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const { blacklist } = require('../blacklist');
require("dotenv").config();


userRouter.post('/register', async(req, res)=>{
    const {name,email,gender,password,age,city,is_married}=req.body;

    try {
        const user=await userModel.findOne({email})
        if(user){
            res.json({msg:'user already registered,please login'})
        }else{
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    res.json({error:err.message})
                }else{
                    const user=new userModel({name,email,password:hash,gender,age,city,is_married})
                    await user.save();
                    res.json({msg:"User registered successfully",user:req.body})
                }
            }) 
        }
       
    } catch (err) {
        res.json({error:err.message})
        
    }
})

userRouter.post('/login', async(req,res)=>{
    //logic
    const {email,password}=req.body;

    try {
        const user=await userModel.findOne({email})
        if(user){
bcrypt.compare(password,user.password,(err,result)=>{
    if(result){
        let token=jwt.sign({userId:user._id,user:user.name},process.env.secret)
        res.json({msg:"Login Success",token})
    }else{
        res.json({msg:"Login Failure//Wrong credantials"})
    }
})
        }else{
            res.json({msg:"user not found"})
        }
    } catch (error) {
        res.json({error:error.message})
    }
})

userRouter.get("/logout",(res,req)=>{
    const token=req.headers.authorization?.split(" ")[1]
    try{
        blacklist.push(token)
        res.status(200).json({msg:"User has been logged out"})
    }catch(err){
        res.status(400).json({error:"Oops not able to log out"})
    }
})

userRouter.get("/", (req, res) => {
    res.json({ msg: "hello" });
    console.log("hello");
 });
 

module.exports ={
    userRouter
}