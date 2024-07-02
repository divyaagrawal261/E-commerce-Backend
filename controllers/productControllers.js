import expressAsyncHandler from "express-async-handler";
import { Product } from "../models/productModel.js";

//Show all product listings
const showAll=expressAsyncHandler(async(req,res)=>{
    const food=await Product.find();
    res.status(200).json(food);
})

//Show all product listings by category
const showCategory = expressAsyncHandler(async (req, res) => {
    const categorySubstring = req.params.category;
    const categoryRegex = new RegExp(categorySubstring, 'i'); 
  
    const products = await Product.find({ category: { $regex: categoryRegex } });
    res.status(200).json(products);
  });

export {showAll, showCategory};