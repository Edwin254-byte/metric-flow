"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const dotenv_1 = require("dotenv");
const path_1 = require("path");
//load the .env file
(0, dotenv_1.config)();
const app = (0, express_1.default)();
//Enforcing cors and decoding json body
app.use((0, cors_1.default)(), (0, express_1.json)());
//registering routes
app.use(routes_1.mainRoutes);
//serving the ui
app.use(express_1.default.static((0, path_1.join)(__dirname, "public")));
app.use((req, res, next) => {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    res.sendFile((0, path_1.join)(__dirname, "public", "index.html"));
});
//registering the error middleware
app.use(function (err, req, res, next) {
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
