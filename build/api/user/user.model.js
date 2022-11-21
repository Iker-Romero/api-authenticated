import mongoose from "mongoose";
import bcrypt from "bcrypt";
var userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    players: [
        { type: mongoose.Schema.Types.ObjectId, ref: "player", required: true },
    ],
}, {
    timestamps: true,
});
userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 16);
    next();
});
var User = mongoose.model("user", userSchema);
export default User;
