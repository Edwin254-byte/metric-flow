import { hashSync } from "bcryptjs";
import { HASH_COUNT } from "../constants";
import { UserModel } from "../models";
import { User } from "../utils";

export async function userHandler() {
  //Create only 1 user
  const users: User[] = [{ email: "odhiamboedu123@gmail.com", password: hashSync("Pass@123", HASH_COUNT) }];

  for (const user of users) {
    const newUser = new UserModel(user);
    await newUser.save();
  }

  console.log("----------users seeded successfully");
}
