import express, { Request, Response } from "express";
import initDB from "./config/db";
import { vehiclesRoutes } from "./modules/vehicles/vehicle.routes";
import { usersRoutes } from "./modules/users/user.routes";
import { bookingsRoutes } from "./modules/bookings/bookings.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();

// PARSER
app.use(express.json()); //FOR JSON

// INITIALIZING DATABASE
initDB();

// ROOT
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to FleetFlow – Where Every Journey Flows Seamlessly.')
});

// AUTH
app.use("/api/v1/auth", authRoutes);

// VEHICLES
app.use("/api/v1/vehicles", vehiclesRoutes);

// USERS
app.use("/api/v1/users", usersRoutes);

// BOOKINGS
app.use("/api/v1/bookings", bookingsRoutes);

//NOT FOUND
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route not found.",
        path: req.path
    });
});

export default app;