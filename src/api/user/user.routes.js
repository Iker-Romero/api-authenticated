import express from "express";

import { register, login } from "./user.controller.js";

const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.get("/login", login);

export default userRoutes;
