import { io } from "socket.io-client";
import { ClientSocket } from "./type";

// TODO: add authentication using JWT
// For now, Just comment and uncomment whenever you switch between production and local
const lclUrl = "http://localhost:3300";
const prdUrl = "http://192.168.10.4:3300";
//const prdUrl = "http://socket-server.v3.lcl";

const socket: ClientSocket = io(prdUrl, { auth: { token: "23jrtiheriufyqwidsf" } }); //our server is at :3000

// socket.on("connect", data => {
//   console.log(data);
// });

socket.on("connect", () => {
  console.log("--------react client connected");
});

export { socket };
