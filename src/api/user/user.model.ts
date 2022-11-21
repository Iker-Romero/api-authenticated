import mongoose from "mongoose";
import bcrypt from "bcrypt";

import { PlayerI } from "./../player/player.model";

interface UserI {
  username: string;
  password: string;
  players: string;
}

const userSchema = new mongoose.Schema<UserI>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    players: [
      { type: mongoose.Schema.Types.ObjectId, ref: "player", required: true },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 16);
  next();
});

const User = mongoose.model("user", userSchema);

export default User;
