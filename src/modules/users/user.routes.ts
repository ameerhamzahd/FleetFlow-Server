import { Router } from "express";
import { usersController } from "./user.controllers";
import { authorizeRole, verifyToken } from "../../middlewares/auth";

const router = Router();

router.get("/", verifyToken, authorizeRole("admin"), usersController.getAllUsers);

router.put("/:userId", verifyToken, usersController.updateUser);

router.delete("/:userId", verifyToken, authorizeRole("admin"), usersController.deleteUser);

export const usersRoutes = router;