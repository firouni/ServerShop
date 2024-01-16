const OrderSchema = require("../models/Order");

//CREATE
exports.CreateOrder = async (req, res) => {
    const newOrder = new OrderSchema(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
};

//UPDATE
exports.UpdateOrder = async (req, res) => {
    try {
        const updatedOrder = await OrderSchema.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
};

//DELETE
exports.DeleteOrder = async (req, res) => {
    try {
        await OrderSchema.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
};

//GET USER ORDERS
exports.UserOrder = async (req, res) => {
    try {
        const orders = await OrderSchema.find({ userId: req.params.userId });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
};

// //GET ALL
exports.AllOrders = async (req, res) => {
    try {
        const orders = await OrderSchema.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
};

// GET MONTHLY INCOME
exports.MonthlyIncome = async (req, res) => {
    const productId = req.query.pid;
    const userId = req.query.uid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await OrderSchema.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                    ...(productId && {
                        products: { $elemMatch: { productId } },
                    }),
                },
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err);
    }
};
