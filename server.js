import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/dbConnect.js";
import cartRoutes from "./routes/cartRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import cors from "cors";
dotenv.config();

connectDb();
const port=process.env.PORT || 5010;
const app=express();
app.use(cors());
app.use(express.json())
app.listen(port,()=>{
    console.log("Server is listening...")
})
app.use("/users",userRoutes)
app.use("/products",productRoutes)
app.use("/cart",cartRoutes)

export default app;