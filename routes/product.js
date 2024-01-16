const express = require("express");
const { CreateProduct, UpdateProduct, DeleteProduct, SpecificProduct, AllProducts } = require('../controllers/product');
const { verifyTokenAndAdmin } = require("./VerifyToken");

const ProductRouter = express.Router();

ProductRouter.post("/", CreateProduct, verifyTokenAndAdmin);
ProductRouter.put("/:id", UpdateProduct, verifyTokenAndAdmin);
ProductRouter.delete("/:id", DeleteProduct, verifyTokenAndAdmin);
ProductRouter.get("/find/:id", SpecificProduct);
ProductRouter.get("/", AllProducts);

module.exports = ProductRouter;
