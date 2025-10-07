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
router.post("/skills",middleware,async (req,res)=>{
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
        console.log(e);
        res.status(500).json({
            
            message:"Error creating skill"
        })
    }

});

//get user skill
router.get("/skills",middleware,async (req,res)=>{
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
router.put("/skills/:id",middleware,async (req,res)=>{
    try{
        const {id}=req.params;
        console.log(id);
        const {name}=req.body;//name of the skill
        console.log(name);
        const userId=(req.user as any).userId;
        console.log(userId);
        //check whether skill belong to user or not
        console.log("hi");
        const skill =await prismaClient.skill.findUnique({
            where:{
                id:Number(id)
            }
        })
        console.log(skill);
        //if skill does not exist
        if(!skill || skill.userId!==userId){
            res.status(404).json({
                message:"Skill not found"
            })
        }
        const updatedSkill=await prismaClient.skill.update({
            where:{
                id:Number(id)
            },
            data:{
                name
            }
        });
        res.json({
            updatedSkill
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Error updating skill"
        })
    }
})

router.delete("/skills/:id",middleware,async (req,res)=>{
    try{
        //need id and userid
        const {id}=req.params;
        console.log(id)
        const userId=(req.user as any).userId;//from middleware
        console.log(userId);
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

export default router;