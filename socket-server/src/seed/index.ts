import { config } from "dotenv";
import mongoose from "mongoose";
import { userHandler } from "./seed-handlers";

//load env
config();

async function dbSeed() {
  try {
    console.log("mongodb connecting...");
    await mongoose.connect(`${process.env.MGO_CONN_URL}`);

    //Execute your db seed handlers
    await userHandler();

    console.log("Finished seeding...");
  } catch (err) {
    console.log("--------Error during seeding---------");
    console.log(err);
  } finally {
    console.log("mongodb disconnecting...");
    await mongoose.disconnect();
  }
}

//Run the db seed
dbSeed();
