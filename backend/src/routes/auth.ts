import express from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const JWT_SECRET=process.env.JWT_SECRET || "default_super_key"
const router=express.Router();
const prismaClient=new PrismaClient();

//signup
router.post("/signup",async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        //check whether the email already exist or not
        const user=await prismaClient.user.findUnique({
            where:{
                email
            }
        });
        //email already exist
        if(user){
            res.status(400).json({
                message:"User Already Exist"
            })
            return;
        }
        //hash the password
        const hashedPassword=await bcrypt.hash(password,9);
        //creatin new user
        const newUser=await prismaClient.user.create({
            data:{
                name,
                email,
                password:hashedPassword
            },
            select:{
                id:true,
                name:true,
                email:true
            }
        })
        //return 
        res.status(201).json({
            message:"User registered successfully",
            user:newUser
        })
    }catch(e){
        console.error(e);
        res.status(500).json({
            messages:"Server error"
        })
    }
})

//SIGNUP
router.post("/signin",async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await prismaClient.user.findUnique({
            where:{
                email
            }
        })
        //email not found means no user available
        if(!user){
            res.status(404).json({
                message:"User does not exist"
            })
            return
        }
        //if user exist re hash the password
        const isValid=await bcrypt.compare(password,user.password);
        if(!isValid){
            res.status(401).json({
                message:"Incorrect Password"
            })
            return
        }
        //user exist generate jwt
        const token=jwt.sign({
            userId:user.id
        },JWT_SECRET);
        //reutrn the response
        res.json({
            success:true,
            token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email
            }
        })
    }catch(e){
        console.error(e);
        res.status(500).json({
            message:"Server error"
        })
    }
})
export default router;