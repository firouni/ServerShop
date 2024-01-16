const express = require("express");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin, } = require("./VerifyToken");
const { CreateOrder, UpdateOrder, DeleteOrder, UserOrder, AllOrders, MonthlyIncome } = require("../controllers/order");

const OrderRouter = express.Router();

OrderRouter.post("/", CreateOrder, verifyToken);
OrderRouter.put("/:id", UpdateOrder, verifyTokenAndAdmin);
OrderRouter.delete("/:id", DeleteOrder, verifyTokenAndAdmin);
OrderRouter.get("/find/:userId", UserOrder, verifyTokenAndAuthorization);
OrderRouter.get("/", AllOrders, verifyTokenAndAdmin);
OrderRouter.get("/income", MonthlyIncome, verifyTokenAndAdmin);

module.exports = OrderRouter;
