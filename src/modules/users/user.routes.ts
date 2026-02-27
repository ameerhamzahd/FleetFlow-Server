import { Router } from "express";
import { usersController } from "./user.controllers";

const router = Router();

router.get("/", usersController.getAllUsers);

router.put("/:userId", usersController.updateUser);

router.delete("/:userId", usersController.deleteUser);

export const userRoutes = router;