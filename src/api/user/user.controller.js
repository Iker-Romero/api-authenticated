import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "./user.model.ts";
import setError from "../../helpers/error/handle.error.js";

export const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);

    const userExists = await User.findOne({ username: newUser.username });
    if (userExists) return next("The username is already taken");

    const newUserInDB = await newUser.save();
    return res.json({
      status: 201,
      message: "New user registered",
      data: newUserInDB,
    });
  } catch (error) {
    return next(setError(500, "User register failed"));
  }
};

export const login = async (req, res, next) => {
  try {
    const userInDB = await User.findOne({ username: req.body.username });
    if (!userInDB) return next("The username doesn't exist");
    if (bcrypt.compareSync(req.body.password, userInDB.password)) {
      userInDB.password = null; // userInDB is a copy from the DB and we remove that password copy from our code
      const token = jwt.sign(
        {
          id: userInDB._id,
          username: userInDB.username,
        },
        req.app.get("secretKey"), // req.app is a default property, it's not defined in the index.js with express()
        {
          expiresIn: "1h",
        }
      );
      console.log(token);
      return res.json({
        status: 200,
        message: "Welcome user",
        user: userInDB,
        token: token,
      });
    } else {
      return next("The password is incorrect");
    }
  } catch (error) {
    return next(setError(500, "User login failed"));
  }
};
