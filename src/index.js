import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import connect from "./helpers/database/database.js";
import userRoutes from "./api/user/user.routes.js";
import setError from "./helpers/error/handle.error.js";

connect();

const server = express();

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

server.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

server.use(express.json({ limit: "1mb" }));

server.use(express.urlencoded({ limit: "1mb", extended: true }));

server.set("secretKey", process.env.SECRET_KEY_JWT);

server.use("/user", userRoutes);
server.use("*", (req, res, next) => next(setError(404, "Route not foundks")));

server.use((error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json(error.message || "Unexpected error");
});

server.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});
