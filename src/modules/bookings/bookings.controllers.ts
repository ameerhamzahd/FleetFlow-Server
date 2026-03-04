import { Request, Response } from "express";
import { bookingServices } from "./bookings.services";

const createBooking = async (req: Request, res: Response) => {
    try {
        const queryResult = await bookingServices.createBooking(req.body);

        res.status(200).json({
            success: true,
            message: "Booking created successfully.",
            data: queryResult
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getAllBookings = async (req: Request, res: Response) => {
    try {
        const role = req.user!.role;
        const userId = req.user!.id;
        const bookings = await bookingServices.getAllBookings(userId, role);
        
        if (!bookings || bookings.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No booking found",
                data: []
            });
        }

        res.status(200).json({ 
            success: true, 
            message: "Bookings retrieved successfully", 
            data: bookings 
        });
    } catch (error: any) {
        res.status(500).json({ 
            success: false, 
            message: error.message, 
            errors: error 
        });
    }
};

export const bookingControllers = {
    createBooking,
    getAllBookings,
    
}