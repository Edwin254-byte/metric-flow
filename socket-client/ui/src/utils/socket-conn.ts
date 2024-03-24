import { io } from "socket.io-client";
import { SOCKET_SERVER_URL } from "../constants";
import { ClientSocket } from "./type";

const socket: ClientSocket = io(SOCKET_SERVER_URL, { auth: { token: "23jrtiheriufyqwidsf" } }); //our server is at :3000

socket.on("connect", () => {
  console.log("--------react client connected");
});

export { socket };

// // TODO: add a socket implementation to ensure a single socket instance
// export class SocketConn {
//   private static instance: SocketConn;
//   private _socket: ClientSocket;
//   private lclUrl = "http://localhost:3300";
//   private prdUrl = "http://192.168.10.4:3300";

//   private constructor() {
//     this._socket = io(this.lclUrl, { auth: { token: "23jrtiheriufyqwidsf" } });
//   }

//   static getInstance() {
//     if (!this.instance) this.instance = new SocketConn();
//     return this.instance;
//   }

//   get socket() {
//     return this._socket;
//   }
// }

// export const socket = SocketConn.getInstance("").socket;
