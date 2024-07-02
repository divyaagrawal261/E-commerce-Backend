import expressAsyncHandler from "express-async-handler";
import {Cart} from "../models/cartModel.js";

//Add items to Carts
const addToCart=expressAsyncHandler(async(req,res)=>{
    const userId = req.user._id;
  const { productId } = req.body;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({
      userId,
      products: [{ productId, quantity: 1 }]
    });
  } else {
    const existingItem = cart.products.find(item => item.productId.toString() === productId);
    
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.products.push({ productId, quantity: 1 });
    }
    
    await cart.save();
  }

  res.status(201).json(cart);
});

//Remove from Cart
const removeFromCart=expressAsyncHandler(async(req,res)=>{
    const userId=req.user._id;

    const productId=req.body.productId;

    let cart=await Cart.findOne({userId});

    cart.products=cart.products.filter(item=>item.productId.toString() != productId);
    await cart.save();
    res.json(cart);
})

//Show cart
const showCart=expressAsyncHandler(async (req, res) => {
    const userId = req.user._id;
  
    const cart = await Cart.findOne({ userId }).populate({
        path: 'products.productId',
        select: 'name rate src'
      });
  
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Oops! the cart is empty" });
    }
  })

export {addToCart,removeFromCart,showCart};