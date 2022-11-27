import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/auth.js";
//  import auth from '../middleware/auth'


export const signIn =async (req,res)=>{
    try {
      console.log(req.body);
        const {email,password}=req.body;
        existingUser=await User.findOne({email});
        console.log(existingUser);
        if(!existingUser) return res.status(404).json({message:"user not found",});

        const isPasswordCorrect=await bcrypt.compare(password,existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message:"incorrect password"});

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, test, { expiresIn: "1h" });

    res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({message:"something went wrong during signin"});
    }
}

export const signUp=async(req,res)=>{
    const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign( { email: result.email, id: result._id }, 'test', { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong during signup" });
    
    console.log(error);
  }
}