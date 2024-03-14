"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRoutes = void 0;
const express_1 = require("express");
const mainRoutes = (0, express_1.Router)();
exports.mainRoutes = mainRoutes;
mainRoutes.get("/hello", (req, res) => res.json("Hello friend. Welcome to the socket-client service"));
