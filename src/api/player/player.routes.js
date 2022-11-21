import express from "express";

import {
  getPlayer,
  getPlayers,
  postPlayer,
  updatePlayer,
  deletePlayer,
} from "./player.controller.js";
import isAuth from "../../middlewares/auth.middleware.js";

const playerRoutes = express.Router();

playerRoutes.get("/", getPlayers);
playerRoutes.get("/:id", getPlayer);
playerRoutes.post("/", [isAuth], postPlayer);
playerRoutes.patch(":id", [isAuth], updatePlayer);
playerRoutes.delete("/:id", [isAuth], deletePlayer);

export default playerRoutes;
