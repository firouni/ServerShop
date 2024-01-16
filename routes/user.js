const express = require("express");
const { getUser, deleteUser, updateUser, getAllUsers, UserStats } = require("../controllers/user");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./VerifyToken");

const UserRouter = express.Router();

UserRouter.get("/:id", getUser, verifyTokenAndAdmin);
UserRouter.get("/", getAllUsers, verifyTokenAndAdmin);
UserRouter.get("/stats", UserStats, verifyTokenAndAdmin);

UserRouter.put("/update/:id", updateUser, verifyTokenAndAuthorization);
UserRouter.delete("/delete/:id", deleteUser, verifyTokenAndAuthorization);

module.exports = UserRouter;