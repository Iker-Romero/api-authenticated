import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connect = async (req, res, next) => {
  try {
    const database = await mongoose.connect(process.env.MONGO_URI);
    const { name, host } = database.connection;
    console.log(`Connected to ${name} database in ${host}`);
  } catch (error) {
    console.error(setError(500, "Couldn't connect to the database"));
  }
};

export default connect;
