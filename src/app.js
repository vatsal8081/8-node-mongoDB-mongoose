import express from "express";
import morgan from "morgan";
import { tourRouter } from "./routes/tourRoutes";

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use("/api/v1/tours", tourRouter);

export { app };
