import { pool } from "../../config/db";
import { vehicleServices } from "../vehicles/vehicle.services";

interface Booking {
    customer_id: string;
    vehicle_id: string;
    rent_start_date: string;
    rent_end_date: string;
    total_price: number;
    status: "active" | "cancelled" | "returned";
}

const createBooking = async (booking: Partial<Booking>) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = booking;

    const vehicle = await vehicleServices.getSingleVehicle(vehicle_id!);
    if (!vehicle) throw new Error("Vehicle not found");

    if (vehicle.availability_status === "booked") {
        throw new Error("Vehicle is already booked");
    }

    const start = new Date(rent_start_date!);
    const end = new Date(rent_end_date!);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error("Invalid date format. Use YYYY-MM-DD");
    }

    if (end <= start) {
        throw new Error("End date must be after start date");
    }

    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const total_price = days * Number(vehicle.daily_rent_price);

    const result = await pool.query(`INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES ($1, $2, $3, $4, $5, 'active') RETURNING *`, [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]);

    const newBooking = result.rows[0];

    await vehicleServices.updateVehicle(vehicle_id as string, { availability_status: "booked" });

    return {
        ...newBooking,
        rent_start_date: rent_start_date,
        rent_end_date: rent_end_date,
        vehicle: {
            vehicle_name: vehicle.vehicle_name,
            daily_rent_price: vehicle.daily_rent_price,
        }
    };
};

export const bookingServices = {
    createBooking
}