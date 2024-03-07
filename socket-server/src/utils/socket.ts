//Where socket.io listeners and (most) emitters
import { IO } from "./types";

export function mainSocket(io: IO, pid: number) {
  io.on("connection", socket => {
    let machineMacA: string;
    const auth = socket.handshake.auth;
    console.log(auth.token);
    //TODO: ADD BETTER AUTHENTICATION
    if (auth.token === "239rfaiskdfvq243EGa4q3wefsdad") {
      //valid nodeClient
      socket.join("nodeClient"); //this client is a nodeClient, put in appropriate room
    } else if (auth.token === "23jrtiheriufyqwidsf") {
      //valid reactClient
      socket.join("reactClient"); //this client is a reactClient, put in appropriate room
    } else {
      //you do not belong here. Go away!
      socket.disconnect();
      console.log("YOU HAVE BEEN DISCONNECTED!!!");
    }
    console.log(`Someone connected on worker ${process.pid}`);
    socket.emit("welcome", "Welcome to our cluster driven socket.io server!");

    socket.on("perfLoad", data => {
      // console.log("Tick...", pid, data.macA);
      // console.log(data);
      if (!machineMacA) {
        machineMacA = data.macA;
        io.to("reactClient").emit("connectedOrNot", { machineMacA, isAlive: true });
      }
      io.to("reactClient").emit("perfLoad", data);
    });

    socket.on("testConnection", data => {
      console.log(data);
    });
    socket.on("welcomeButton", data => {
      console.log(data);
    });

    socket.on("disconnect", reason => {
      //a nodeClient just disconnected. Let the front end know!
      io.to("reactClient").emit("connectedOrNot", { machineMacA, isAlive: false });
    });
  });
}
