import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
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

const getAllVehicles = async (req: Request, res: Response) => {
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
};

const getSingleVehicle = async (req: Request, res: Response) => {
    try {
        const queryResult = await vehicleServices.getSingleVehicle(req.params.id as string);

        if (queryResult.rows.length === 0) {
            res.status(400).json({
                success: false,
                message: "Vehicle not found.",
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Vehicle retrieved successfully.",
                data: queryResult.rows[0]
            })
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Vehicle not found.",
            details: error
        })
    }
};

const updateVehicle = async (req: Request, res: Response) => {
    try {
        const queryResult = await vehicleServices.updateVehicle(req.params.id as string, req.body);

        if (!queryResult) {
            return res.status(400).json({
                success: false,
                message: "No valid fields provided to update."
            });
        }

        if (queryResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found."
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Vehicle updated successfully.",
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

const deleteVehicle = async (req: Request, res: Response) => {
    try {
        const queryResult = await vehicleServices.deleteVehicle(req.params.id as string);

        if (queryResult.rowCount === 0) {
            res.status(400).json({
                success: false,
                message: "Vehicle not found.",
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Vehicle deleted successfully.",
                data: null
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Vehicle not found.",
            details: error
        })
    }
}

export const vehicleController = {
    createVehicle,
    getAllVehicles,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle
}