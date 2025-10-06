import express from "express";
import authRouter from "./routes/auth.js";
import cors from "cors";
import skillRouter from "./routes/skill.js";
import interestRouter from "./routes/interest.js";
import carrerRouter from "./routes/carrerpath.js";
const app = express();
app.use(express.json());
app.use(cors());
//calling auth routes
app.use("/api/auth", authRouter);
app.use("/api/skill", skillRouter);
app.use("/api/interest", interestRouter);
app.use("/api/carrerpath", carrerRouter);
console.log("Listening on 3001");
app.listen(3001);
//# sourceMappingURL=server.js.map