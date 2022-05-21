import express from "express";
import { createTour } from "../controllers/tourController";

const router = express.Router();

router.post("/", createTour);

export { router as tourRouter };
