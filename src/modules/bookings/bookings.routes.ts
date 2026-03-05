import { Router } from "express";
import { bookingControllers } from "./bookings.controllers";
import { authorizeRole, verifyToken } from "../../middlewares/auth";

const router = Router();

router.post("/", bookingControllers.createBooking);

router.get("/", verifyToken, authorizeRole("customer", "admin"), bookingControllers.getAllBookings);

router.put("/:bookingId", verifyToken, authorizeRole("customer", "admin"), bookingControllers.updateBooking);

export const bookingsRoutes = router;