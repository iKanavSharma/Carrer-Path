
import express, { application } from "express";

import { middleware } from "../middleware/authMiddleware.js";
import { PrismaClient } from "@prisma/client";

const prismaClient=new PrismaClient();

const router=express.Router();

//post interset for user
router.post("/intersets",middleware,async (req,res)=>{
    try{
        const userId=(req.user as any).userId;//from middleware
        const {name}=req.body;
        if(!name){
            res.status(400).json({
                message:"Interest is required"
            })
            return
        }
        //create
        const interset=await prismaClient.interest.create({
            data:{
                name,
                userId
            }
        })
        res.json({
            interset
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Server error"
        })
    }
})

//get interest
router.get("/intersets",middleware,async (req,res)=>{
    try{
        const userId=(req.user as any).userId;
        const interests=await prismaClient.interest.findMany({
            where:{
                userId
            }
        })
        res.json({
            interests
        })
    }catch(e){
        res.json({
            message:"Server error"
        })
    }

})

//update interset
router.put("/intersets/:id",middleware,async (req,res)=>{
    try{
        const {id}=req.params;
        const userId=(req.user as any).userId;
        const {name}=req.body;

        const interset=await prismaClient.interest.findUnique({
            where:{
                id:Number(id)
            }
        })
        //check
        if(!interset || interset.userId!==userId){
            res.json({
                message:"Interset not found"
            })
            return
        }
        //update uer
        const updatedInterset=await prismaClient.interest.update({
            where:{
                id:Number(id),
            },
            data:{
                name
            }
        })
        res.json({
            updatedInterset
        })
    }catch(e){
        res.json({
            message:"Server error"
        })
    }
})

//delete
router.delete("/intersets/:id",middleware,async (req,res)=>{
    try{
        const {id}=req.params;
        const userId=(req.user as any).userId;
        const intersets=await prismaClient.interest.findUnique({
            where:{
                id:Number(id)
            }
        })
        //check
        if(!intersets || intersets.userId!==userId){
            res.status(404).json({
                message:"Interset not found"
            })
        }
        //delete 
        await prismaClient.interest.delete({
            where:{
                id:Number(id)
            }
        })
        res.json({
            message:"Interest deleted successfully"
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Server error"
        })
    }
})

export default router;