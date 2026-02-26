import { Request, Response } from "express";
import { userServices } from "./user.services";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const queryResult = await userServices.getAllUsers();

        res.status(200).json({
            success: true,
            message: "Users retrieved successfully.",
            data: queryResult.rows
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Users not found.",
            details: error
        })
    }
};

export const usersController = {
    getAllUsers
}