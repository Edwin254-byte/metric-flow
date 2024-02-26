import os from "os";
import io from "socket.io-client";
import { ClientSocket, getMac, perfLoadData } from "./utils";

// The node program that captures local performance data
// and sends it via socket to the server

//TODO: add socket authentication

const socket: ClientSocket = io("http://localhost:3000", { auth: { token: "239rfaiskdfvq243EGa4q3wefsdad" } });
const nI = os.networkInterfaces();

socket.on("connect", () => {
  //use the mac as a unique identifier for machines
  const macA = getMac(nI) + Math.floor(Math.random() * 100000); //mac address
  console.log(macA);

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
