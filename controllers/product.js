const ProductSchema = require("../models/Product");

//CREATE
exports.CreateProduct = async (req, res) => {
    const newProduct = new ProductSchema(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
};

//UPDATE
exports.UpdateProduct = async (req, res) => {
    try {
        const updatedProduct = await ProductSchema.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
};

//DELETE
exports.DeleteProduct = async (req, res) => {
    try {
        await ProductSchema.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
};

//GET PRODUCT
exports.SpecificProduct = async (req, res) => {
    try {
        const product = await ProductSchema.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
};

//GET ALL PRODUCTS
exports.AllProducts = async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;
        if (qNew) {
            products = await ProductSchema.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
            products = await ProductSchema.find({
                categories: {
                    $in: [qCategory],
                },
            });
        } else {
            products = await ProductSchema.find();
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
};
