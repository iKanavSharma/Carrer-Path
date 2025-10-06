
import express from "express";
import { middleware } from "../middleware/authMiddleware.js";
import { PrismaClient } from "@prisma/client";

const router=express.Router();
const prismaClient=new PrismaClient();

//new carrer path
router.post("/",middleware,async (req,res)=>{
    try{
        const {name,requiredSkills,roadmap}=req.body;
        //check whether a field is missing or not
        if(!name || !requiredSkills || !roadmap){
            res.json({
                message:"All fields are required"
            })
            return 
        }
        const userId=(req.user as any).userId;
        const carrerPath=await prismaClient.carrerPath.create({
            data:{
                name,
                requiredSkills,
                roadmap,
                userId
            }
        })
        res.json({
            carrerPath
        })
    }catch(e){
        res.status(500).json({
            message:"Server error"
        })
    }
})

//get carrerpath for user 
router.get("/",middleware,async (req,res)=>{
    try{
        const userId=(req.user as any).userId;
        const paths=await prismaClient.carrerPath.findMany({
            where:{
                userId
            }
        })
        //check 
        if(!paths || paths.length===0){
            res.status(404).json({
                message:"No carrer found"
            })
        }
        res.json({
            paths
        })
    }catch(e){
        res.status(500).json({
            message:"Server error"
        })
    }
})

//update 
router.put("/:id",middleware,async (req,res)=>{
    try{
        const {id}=req.params;
        const {name,requiredSkills,roadmap}=req.body;
        const userId=(req.user as any).userId;
        const path=await prismaClient.carrerPath.findUnique({
            where:{
                id: Number(id)
            }
        })
        //check
        if(!path || path.userId!==userId){
            res.status(400).json({
                message:"Carrer path not found"
            })
            return
        }
        const updatedPath=await prismaClient.carrerPath.update({
            where:{
                id:Number(id)
            },
            data:{
                name,
                requiredSkills,
                roadmap
            }
        })
        res.json({
            updatedPath
        })
    }catch(e){
        res.status(500).json({
            message:"Error updating Carrer"
        })
    }
})

//delete
router.delete("/:id",middleware,async (req,res)=>{
    try{
        const {id}=req.params;
        const userId=(req.user as any).userId;
        const carrerPath=await prismaClient.carrerPath.findUnique({
            where:{
                id:Number(id)
            }
        })
        //check
        if(!carrerPath || carrerPath.userId!==userId){
            res.status(404).json({
                message:"Carrer path not found"
            })
        }
        //delete
        await prismaClient.carrerPath.delete({
            where:{
                id:Number(id)
            }
        })
        res.json({
            message:"Carrer Path deleted successfully"
        })
    }catch(e){
        res.status(500).json({
            message:"Server error"
        })
    }
})

export default router;