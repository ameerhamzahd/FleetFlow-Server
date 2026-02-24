import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";

const createVehicle = async(req: Request, res: Response) => {
    try {
        const queryResult = await vehicleServices.createVehicle(req.body);

        res.status(201).json({
            success: true,
            message: "Vehicle added successfully.",
            data: queryResult.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getAllVehicles = async(req: Request, res: Response) => {
    try {
        const queryResult = await vehicleServices.getAllVehicles();

        res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully.",
            data: queryResult.rows
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Vehicles not found.",
            details: error
        })
    }
}

export const vehicleController = {
    createVehicle,
    getAllVehicles
}