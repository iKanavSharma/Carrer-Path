import express from "express";
import { middleware } from "../middleware/authMiddleware.js";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prismaClient = new PrismaClient();
router.post("/", middleware, async (req, res) => {
    try {
        console.log("hi");

        const userId = req.user.userId;
        const {carrerPathId} = req.body;
        console.log(carrerPathId);
        if (!carrerPathId) {
            res.status(400).json({
                message: "Carrer id is required"
            });
            return;
        }
        console.log("hi");
        //check whether path is already saved or not
        const existing = await prismaClient.savedPath.findFirst({
           
            where: {
                carrerPathId: Number(carrerPathId),
                userId
                
            }
            
        });
        console.log("ji");
        console.log(existing);
        //already exist
        if (existing) {
            res.status(400).json({
                message: "Carrer Path already exist"
            });
            return;
        }
        //if not then save
        const savedPath = await prismaClient.savedPath.create({
            data: {
                userId,
                carrerPathId
            }
        });
        res.json({
            savedPath
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Server error"
        });
    }
});
//get all saved path
router.get("/", middleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const savedPaths = await prismaClient.savedPath.findMany({
            where: {
                userId
            }
        });
        if (!savedPaths || savedPaths.length === 0) {
            res.status(400).json({
                message: "No saved Path found"
            });
        }
        res.json({
            savedPaths
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Server Error"
        });
    }
});
//delete
router.delete("/:id", middleware, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        const saved = await prismaClient.savedPath.findUnique({
            where: {
                id: Number(id),
                userId
            }
        });
        if (!saved || saved.userId !== userId) {
            res.status(400).json({
                message: "Saved Path not found"
            });
            return;
        }
        await prismaClient.savedPath.delete({
            where: {
                id: Number(id)
            }
        });
        res.json({
            message: "Path deleted sucessfully"
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Server error"
        });
    }
});
export default router;
//# sourceMappingURL=savedpath.js.map