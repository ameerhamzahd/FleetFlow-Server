import { Router } from "express";
import { usersController } from "./user.controllers";

const router = Router();

router.get("/", usersController.getAllUsers);

router.put("/:userId", usersController.updateUser);

export const userRoutes = router;