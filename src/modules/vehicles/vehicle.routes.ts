import { Router } from "express";
import { vehicleController } from "./vehicle.controller";

const router = Router();

router.post("/", vehicleController.createVehicle);

router.get("/", vehicleController.getAllVehicles);

router.get("/:id", vehicleController.getSingleVehicle);

router.put("/:id", vehicleController.updateVehicle);


export const vehicleRoutes = router;