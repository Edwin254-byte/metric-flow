import mongoose from "mongoose";

export async function connectMongo() {
  await mongoose.connect(`${process.env.MGO_CONN_URL}`);
  console.log(`mongo server state: ${mongoose.STATES[mongoose.connection.readyState]}`);
}
