import { ErrorRequestHandler, Express, json } from "express";
import cors from "cors";
import { mainRoutes } from "./routes";

export function httpServer(app: Express) {
  app.use(json(), cors());

  app.use(mainRoutes);

  //registering the error middleware
  app.use(<ErrorRequestHandler>function (err, req, res, next) {
    console.log("---------An error occurred:");
    console.log(err);

    const msg = err.message || "Internal server error";
    const status = 500;

    return res.status(status).json({ msg });
  });
}
