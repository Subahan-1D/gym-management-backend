/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import { notFound } from "./app/middlewares/notFound";
import { router } from "./app/routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", router);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Tour Management System",
  });
});
app.use(notFound);

export default app;
