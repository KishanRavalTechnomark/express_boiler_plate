import auth from "./subroutes/auth";
import express from "express";

const routes = express.Router();

routes.use("/auth", auth);

export default routes;
