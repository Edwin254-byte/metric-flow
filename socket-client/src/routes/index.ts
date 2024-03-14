import { Router } from "express";

const mainRoutes = Router();

mainRoutes.get("/hello", (req, res) => res.json("Hello friend. Welcome to the socket-client service"));

export { mainRoutes };
