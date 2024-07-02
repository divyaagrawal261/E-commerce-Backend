import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter a Product Name"]
    },
    desc:{
        type:String,
        required:[true, "Please enter a description"]
    },
    rate:{
        type:Number,
        required:[true, "Please enter a rate"]
    },
    category:{
        type:String,
        required:[true, "Please enter a category"]
    },
    src:{
        type:String,
        required:[true, "Please enter a source"]
    }
});

export const Product = new mongoose.model("Product",productSchema);