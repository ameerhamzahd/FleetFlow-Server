import { Router } from "express";
import { vehicleControllers } from "./vehicle.controllers";
import { authorizeRole, verifyToken } from "../../middlewares/auth";

const router = Router();

router.post("/", verifyToken, authorizeRole("admin"), vehicleControllers.createVehicle);

router.get("/", vehicleControllers.getAllVehicles);

router.get("/:vehicleId", vehicleControllers.getSingleVehicle);

router.put("/:vehicleId", verifyToken, authorizeRole("admin"), vehicleControllers.updateVehicle);

router.delete("/:vehicleId", verifyToken, authorizeRole("admin"), vehicleControllers.deleteVehicle);


export const vehiclesRoutes = router;