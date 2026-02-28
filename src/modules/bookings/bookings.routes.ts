import { Router } from "express";
import { bookingControllers } from "./bookings.controllers";

const router = Router();

router.post("/", bookingControllers.createBooking);

export const bookingsRoutes = router;