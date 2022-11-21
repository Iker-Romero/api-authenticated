import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./helpers/database/database.js";
import userRoutes from "./api/user/user.routes.js";
import playerRoutes from "./api/player/player.routes.js";
import setError from "./helpers/error/handle.error.js";
connect();
var app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
app.use(cors({
    origin: function (origin, callback) { return callback(null, true); },
    credentials: true,
}));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));
app.set("secretKey", process.env.SECRET_KEY_JWT);
app.use("/user", userRoutes);
app.use("/players", playerRoutes);
app.use("*", function (req, res, next) { return next(setError(404, "Route not found")); });
app.use(function (error, req, res, next) {
    return res
        .status(error.status || 500)
        .json(error.message || "Unexpected error");
});
app.listen(process.env.PORT, function () {
    console.log("app running on port: ".concat(process.env.PORT));
});
