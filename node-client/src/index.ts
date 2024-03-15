// The node program that captures local performance data
// and sends it via socket to the server
import { config } from "dotenv";
import os from "os";
import io from "socket.io-client";
import { ClientSocket, getMac, perfLoadData } from "./utils";

//lOAD ENV
config();

const isPrd = `${process.env.NODE_ENV}` === "production";
process.env.SOCKET_SERVER_URL = isPrd ? `${process.env.INT_SOCKET_SERVER_URL}` : `${process.env.LCL_SOCKET_SERVER_URL}`;

//TODO: add socket authentication
const token = "239rfaiskdfvq243EGa4q3wefsdad";
const socket: ClientSocket = io(`${process.env.SOCKET_SERVER_URL}`, { auth: { token } });
const nI = os.networkInterfaces();

console.log("----------waiting to connect to: ", process.env.SOCKET_SERVER_URL);

socket.on("connect", () => {
  //use the mac as a unique identifier for machines
  const macA = getMac(nI) + Math.floor(Math.random() * 100000); //mac address
  console.log("MacA: ", macA);

  const perfDataInterval = setInterval(async () => {
    //every second call performance data and emit
    const perfData = await perfLoadData();
    perfData.macA = macA;
    socket.emit("perfLoad", perfData);
  }, 1000);

  socket.on("disconnect", reason => {
    console.log("socket disconnected. reason: ", reason);
    clearInterval(perfDataInterval); //if we disconnect for any reason... stop ticking./
    //this includes!!!! reconnect
  });
});
