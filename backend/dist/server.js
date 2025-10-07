import express from "express";
import authRouter from "./routes/auth.js";
import cors from "cors";
import skillRouter from "./routes/skill.js";
import interestRouter from "./routes/interest.js";
import carrerRouter from "./routes/carrerpath.js";
import savedRouter from "./routes/savedpath.js";
const app = express();
app.use(express.json());
app.use(cors());
//calling auth routes
app.use("/api/auth", authRouter);
app.use("/api", skillRouter);
app.use("/api", interestRouter);
app.use("/api", carrerRouter);
app.use("/api", savedRouter);
console.log("Listening on 3001");
app.listen(3001);
//# sourceMappingURL=server.js.map