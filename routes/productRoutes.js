import express from "express";
import { showAll, showCategory } from "../controllers/productControllers.js";
import validateToken from "../middlewares/validateToken.js";

const Router=express.Router();

Router.get("/all",showAll)
Router.get("/category/:category",showCategory)
// Router.use("/",validateToken)

export default Router;