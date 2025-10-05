import express from "express";
import { PrismaClient } from "@prisma/client";
import { middleware } from "../middleware/authMiddleware.js";
import type { JwtPayload } from "jsonwebtoken";
const prismaClient=new PrismaClient();

const router=express.Router();

declare global{
    namespace Express{
        export interface Request{
            user?:string|JwtPayload
        }
    }
}

//add skill(create)
//post
router.post("/",middleware,async (req,res)=>{
    try{
        const {name}=req.body;//name of the skill
        const userId=(req.user as any).userId;//from token
        const skill=await prismaClient.skill.create({
            data:{
                name,
                userId
            }
        });

        res.status(201).json({
            skill
        })
    }catch(e){
        res.status(500).json({
            message:"Error creating skill"
        })
    }

});

//get user skill
router.get("/",middleware,async (req,res)=>{
    try{
        const userId=(req.user as any).userId;
        const skills=await prismaClient.skill.findFirst({
            where:{
                userId
            }
        });
        res.json({
            skills
        })
    }catch(e){
        res.status(500).json({
            message:"Error fetching skills"
        })
    }
});

//update skills
router.put("/:id",middleware,async (req,res)=>{
    try{
        const id=req.params;
        const name=req.body;//name of the skill
        const userId=(req.user as any).userId;
        //check whether skill belong to user or not
        const skill =await prismaClient.skill.findUnique({
            where:{
                id:Number(id)
            }
        })
        //if skill does not exist
        if(!skill || skill.userId!==userId){
            res.status(404).json({
                message:"Skill not found"
            })
        }
        const updateedSkill=await prismaClient.skill.update({
            where:{
                id:Number(id)
            },
            data:{
                name
            }
        });
        res.json({
            updateedSkill
        })
    }catch(e){
        res.status(500).json({
            message:"Error updating skill"
        })
    }
})

router.post("/:id",middleware,async (req,res)=>{
    try{
        //need id and userid
        const {id}=req.params;
        const userId=req.body;//from middleware
        //skill name to bne deleted
        const skill=await prismaClient.skill.findUnique({
            where:{
                id:Number(id)
            }
        })
        //check skill exist or not and whether userId macthes to the specific user or not
        if(!skill || skill.userId!==userId){
            res.status(404).json({
                message:"Skill not found"
            })
            return
        }
        await prismaClient.skill.delete({
            where:{
                id:Number(id)
            }
        })
        res.json({
            message:"Skill deleted successfully"
        })
    }catch(e){
        res.status(500).json({
            message:"Error deleting skill"
        })
    }
})