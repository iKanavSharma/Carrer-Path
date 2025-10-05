import type { NextFunction, Request, Response } from "express";
import { type JwtPayload } from "jsonwebtoken";
declare global {
    namespace Express {
        interface Request {
            user?: string | JwtPayload;
        }
    }
}
export declare const middleware: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=authMiddleware.d.ts.map