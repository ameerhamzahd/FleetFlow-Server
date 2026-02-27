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

const updateUser = async (req: Request, res: Response) => {
    try {
        const queryResult = await userServices.updateUser(req.params.userId as string, req.body);

        if (!queryResult) {
            return res.status(400).json({
                success: false,
                message: "No valid fields provided to update."
            });
        }

        if (queryResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        } else {
            res.status(200).json({
                success: true,
                message: "User updated successfully.",
                data: queryResult.rows[0]
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Something went wrong.",
            details: error.message
        });
    }
};

const deleteUser = async (req: Request, res: Response) => {
    try {
        const queryResult = await userServices.deleteUser(req.params.userId as string);

        if (queryResult.rowCount === 0) {
            res.status(400).json({
                success: false,
                message: "User not found.",
            });
        } else {
            res.status(200).json({
                success: true,
                message: "User deleted successfully.",
                data: null
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Something went wrong.",
            details: error
        })
    }
}

export const usersController = {
    getAllUsers,
    updateUser,
    deleteUser
}