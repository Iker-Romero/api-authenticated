import mongoose from "mongoose";

export interface PlayerI {
  nickname: string;
}

const playerSchema = new mongoose.Schema<PlayerI>(
  {
    nickname: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const Player = mongoose.model("player", playerSchema);

export default Player;
