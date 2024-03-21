import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UserModel } from "../../models";
import { User } from "../../utils";
import { JWT_SECRET } from "../../constants";

export async function signinHandler(data: User) {
  const { email, password } = data;

  //find the user
  const existingUser = await UserModel.findOne({ email });
  if (!existingUser) throw new Error("User with provided email not found");

  //validate the password
  const validPassword = compareSync(password, existingUser.password);
  if (!validPassword) throw new Error("Invalid password provided");

  //create tokens
  const accessToken = sign({ email }, JWT_SECRET, { expiresIn: "1h" });

  return accessToken;
}
