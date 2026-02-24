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

export const vehicleController = {
    createVehicle
}