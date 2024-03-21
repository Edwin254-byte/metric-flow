import { config } from "dotenv";
import App from "express";
import { Server } from "socket.io";
import { httpServer } from "./http";
import { connectMongo, mainSocket } from "./utils";

const app = App();

// Load env
config();

//Register the http server
httpServer(app);

(async () => {
  await connectMongo();

  // const server = http.createServer(app);
  const port = +`${process.env.SOCKET_SERVER_PORT}` || 3300;
  const server = app.listen(port);

  const io = new Server(server, { cors: { origin: "*", credentials: true } });
  //mainSocket is OUR file where our emits and listens happen.
  mainSocket(io, process.pid);
})();

// Socket.io server that will service both node and react clients
// Req:
// - socket.io
// - @socket.io/cluster-adapter
// - @socket.io/sticky

// entrypoint for our cluster which will make workers
// and the workers will do the Socket.io handling
//See https://github.com/elad/node-cluster-socket.io
