import { Request, Response } from "express";
import { authServices } from "./auth.services";

const signUp = async (req: Request, res: Response) => {
    try {
        const queryResult = await authServices.signUp(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: queryResult
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const authControllers = {
    signUp
}