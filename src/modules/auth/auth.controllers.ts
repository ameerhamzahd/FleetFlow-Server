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

const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const data = await authServices.signIn(email, password);

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                accessToken: data.token,
                user: data.user
            }
        });
    } catch (error: any) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

export const authControllers = {
    signUp,
    signIn
}