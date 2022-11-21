import Player from "./player.model.ts";
import setError from "../../helpers/error/handle.error.js";

export const getPlayers = async (req, res, next) => {
  try {
    const players = await Player.find();
    return res.status(200).json(players);
  } catch (error) {
    return next(setError(500, "Couldn't get players data from the database"));
  }
};

export const getPlayer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const player = await Player.findById(id);
    return res.status(200).json(player);
  } catch (error) {
    return next(setError(500, "Couldn't get player data from the database"));
  }
};

export const postPlayer = async (req, res, next) => {
  try {
    const newPlayer = await new Player(req.body);

    const playerExists = await Player.findOne({ nickname: req.nickname });
    if (playerExists) return next("That player already exists in the database");

    const newPlayerToDB = await newPlayer.save();
    return res.status(201).json(newPlayerToDB);
  } catch (error) {
    return next(setError(500, "Couldn't post player data to the database"));
  }
};

export const updatePlayer = async (req, res, next) => {
  try {
    const { id } = req.id;
    const playerUpdated = Player.findByIdAndUpdate(id, req.body);
    return res.status(200).json(playerUpdated);
  } catch (error) {
    return next(setError(500, "Couldn't update the player in the database"));
  }
};

export const deletePlayer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedPlayer = await Player.findByIdAndDelete(id);
    return res.status(200).json(removedPlayer);
  } catch (error) {
    return next(setError(500, ""));
  }
};
