import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "../config";

interface JwtPayload {
    id: number;
    role: "admin" | "customer";
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ 
            success: false, 
            message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: "No token provided" 
        });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET as string) as JwtPayload;

        req.user = { 
            id: decoded.id, 
            role: decoded.role
        };

        next();
    } catch (err) {
        return res.status(401).json({ 
            success: false, 
            message: "Invalid token" 
        });
    }
};