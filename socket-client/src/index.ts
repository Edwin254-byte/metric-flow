import App, { ErrorRequestHandler, json } from "express";
import cors from "cors";
import { mainRoutes } from "./routes";
import { config } from "dotenv";
import { join } from "path";

//load the .env file
config();

const app = App();

//Enforcing cors and decoding json body
app.use(cors(), json());

//registering routes
app.use(mainRoutes);

//serving the ui
app.use(App.static(join(__dirname, "public")));
app.use((req, res, next) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  res.sendFile(join(__dirname, "public", "index.html"));
});

//registering the error middleware
app.use(<ErrorRequestHandler>function (err, req, res, next) {
  console.log("---------An error occurred:");
  console.log(err);

  const msg = err.message || "Internal server error";
  const status = 500;

  res.status(status).json({ msg });
});

//Exposing the server
const port = process.env.PORT || 3100;
const host = "0.0.0.0";
const extUrl = process.env.EXTERNAL_URL;

app.listen({ host, port }, () => {
  console.log(`🚀🚀 server ready at: http://${host}:${port}`);
  console.log(extUrl ? `External url: ${extUrl}` : "External url not provided");
});
