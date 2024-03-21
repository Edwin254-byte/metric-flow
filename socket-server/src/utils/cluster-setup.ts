import { createAdapter, setupPrimary } from "@socket.io/cluster-adapter"; //makes it so the primary node can emit to everyone
import { setupMaster, setupWorker } from "@socket.io/sticky"; //makes it so a client can find its way back to the correct worker
import cluster from "cluster"; //makes it so we can use multiple threads
import http from "http"; //if we need Express, we will implement it a different way
import os from "os";
import { Server } from "socket.io";
import { connectMongo, mainSocket } from ".";

const numCPUs = os.cpus().length;

export async function clusterSetUp(server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) {
  if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);

    await connectMongo();

    // setup sticky sessions
    setupMaster(server, { loadBalancingMethod: "least-connection" });

    // setup connections between the workers
    setupPrimary();

    // needed for packets containing buffers (you can ignore it if you only send plaintext objects)
    // Node.js < 16.0.0
    //   cluster.setupMaster({
    //     serialization: "advanced",
    //   });
    // Node.js > 16.0.0
    cluster.setupPrimary({ serialization: "advanced" });

    for (let i = 0; i < numCPUs; i++) cluster.fork();

    cluster.on("exit", worker => {
      console.log(`Worker ${worker.process.pid} died`);
      cluster.fork();
    });
  } else {
    console.log(`Worker ${process.pid} started`);

    const io = new Server(server, { cors: { origin: "*", credentials: true } });

    // use the cluster adapter
    io.adapter(createAdapter()); //change from the default adapter

    // setup connection with the primary process
    setupWorker(io);

    //mainSocket is OUR file where our emits and listens happen.
    mainSocket(io, process.pid);
  }
}
