const CartSchema = require("../models/Cart");

//CREATE

exports.CreateCart = async (req, res) => {
    const newCart = new CartSchema(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
};

//UPDATE
exports.UpdateCart = async (req, res) => {
    try {
        const updatedCart = await CartSchema.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
};

//DELETE
exports.DeleteCart = async (req, res) => {
    try {
        await CartSchema.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
};

//GET USER CART
exports.UserCart = async (req, res) => {
    try {
        const cart = await CartSchema.findOne({ userId: req.params.userId });
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
};

// //GET ALL

exports.AllCarts = async (req, res) => {
    try {
        const carts = await CartSchema.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
};
