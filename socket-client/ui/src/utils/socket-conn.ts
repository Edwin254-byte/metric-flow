import { io } from "socket.io-client";
import { ClientSocket } from "./type";

const options = {
  auth: { token: "23jrtiheriufyqwidsf" },
};

const socket: ClientSocket = io("http://localhost:3000", options); //our server is at :3000

// socket.on("connect", data => {
//   console.log(data);
// });

socket.on("connect", () => {
  console.log("--------react client connected");
});

export { socket };
