import type { JwtPayload } from "jsonwebtoken";
declare const router: import("express-serve-static-core").Router;
declare global {
    namespace Express {
        interface Request {
            user?: string | JwtPayload;
        }
    }
}
export default router;
//# sourceMappingURL=skill.d.ts.map