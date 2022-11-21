import express from "express";
import { getPlayer, getPlayers, postPlayer, updatePlayer, deletePlayer, } from "./player.controller.js";
var playerRoutes = express.Router();
playerRoutes.get("/", getPlayers);
playerRoutes.get("/:id", getPlayer);
playerRoutes.post("/", postPlayer);
playerRoutes.patch(":id", updatePlayer);
playerRoutes.delete("/:id", deletePlayer);
export default playerRoutes;
