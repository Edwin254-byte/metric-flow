import { Router } from "express";
import { signin } from "../controllers";
import { auth } from "../middleware";

const mainRoutes = Router();

mainRoutes.get("/", (req, res) => res.json("Hello friend, welcome metric flow server"));
mainRoutes.post("/auth", auth, (req, res) => res.json("Auth middleware"));
mainRoutes.post("/signin", signin);

export { mainRoutes };
