import expressAsyncHandler from "express-async-handler";
import user from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//Register a user
const registerUser=expressAsyncHandler(async(req,res)=>{
    var {username,place,email,contact,password}=req.body;
    const hashedPassword=await bcrypt.hash(password,10);
    password=hashedPassword

    const regUser=await user.create({username,place,email,contact,password})
    res.status(201).json(regUser);
})

//login user
const loginUser=expressAsyncHandler(async(req,res)=>{
    const regUser=await user.findOne({email:req.body.email});
    const password=req.body.password
    if(!regUser)
    res.status(404).json({message: "User doesn't exist"})
    else if(!password)
    res.status(400).json({message:"Password doesn't match"})
    else if(regUser && bcrypt.compare(regUser.password,password))
    {
        const token=jwt.sign({regUser},process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        
        res.status(200).json({token})
    }  
})

//get current user
const getCurrentUser=expressAsyncHandler(async(req,res)=>{
    const email=req.user.email;
    const currentUser=await user.findOne({email});
    res.status(200).json(currentUser)
})
export {registerUser,loginUser,getCurrentUser};
