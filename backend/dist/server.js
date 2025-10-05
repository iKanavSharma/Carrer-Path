import express from "express";
import authRouter from "./routes/auth.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
//calling auth routes
app.use("/auth", authRouter);
console.log("Listening on 3001");
app.listen(3001);
//# sourceMappingURL=server.js.map