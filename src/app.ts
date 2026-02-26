import express, { Request, Response } from "express";
import initDB from "./config/db";
import { vehicleRoutes } from "./modules/vehicles/vehicle.routes";
import { userRoutes } from "./modules/users/user.routes";

const app = express();

// PARSER
app.use(express.json()); //FOR JSON

// INITIALIZING DATABASE
initDB();

// ROOT
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to FleetFlow – Where Every Journey Flows Seamlessly.')
});

// VEHICLES
app.use("/api/v1/vehicles", vehicleRoutes);

// USERS
app.use("/api/v1/users", userRoutes);

//NOT FOUND
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route not found.",
        path: req.path
    });
});

export default app;