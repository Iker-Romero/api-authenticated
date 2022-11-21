import mongoose from "mongoose";
var playerSchema = new mongoose.Schema({
    nickname: { type: String, required: true, unique: true },
}, {
    timestamps: true,
});
var Player = mongoose.model("player", playerSchema);
export default Player;
