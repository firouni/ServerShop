const express = require("express");
const { CreateCart, UpdateCart, DeleteCart, UserCart, AllCarts } = require("../controllers/cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin, } = require("./VerifyToken");

const CartRouter = express.Router();

CartRouter.post("/", CreateCart, verifyToken);
CartRouter.put("/:id", UpdateCart, verifyTokenAndAuthorization);
CartRouter.delete("/:id", DeleteCart, verifyTokenAndAuthorization);
CartRouter.get("/find/:userId", UserCart, verifyTokenAndAuthorization);
CartRouter.get("/", AllCarts, verifyTokenAndAdmin);

module.exports = CartRouter;
