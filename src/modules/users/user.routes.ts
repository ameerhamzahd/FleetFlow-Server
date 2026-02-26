import { Router } from "express";
import { usersController } from "./user.controllers";

const router = Router();

router.get("/", usersController.getAllUsers);

export const userRoutes = router;