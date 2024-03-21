import { Schema, model } from "mongoose";
import { User } from "../utils";

const userSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const UserModel = model("user", userSchema);
