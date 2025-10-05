import jwt, {} from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "default_super_key";
export const middleware = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        res.status(401).json({
            message: "No token"
        });
        return;
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        //re initiize
        req.user = decoded;
        next();
    }
    catch (e) {
        res.status(401).json({
            message: "Invalid token"
        });
    }
};
//# sourceMappingURL=authMiddleware.js.map