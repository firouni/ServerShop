const UserSchema = require("../models/User");
const bcrypt = require("bcryptjs");

//UPDATE
exports.updateUser = async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSaltSync(10);
            req.body.password = await bcrypt.hashSync(req.body.password, salt);
        }
        try {
        const updatedUser = await UserSchema.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You can update only your account!");
    }
};

//DELETE
exports.deleteUser = async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await UserSchema.findById(req.params.id);
            try {
                await UserSchema.findByIdAndDelete(req.params.id);
                res.status(200).json(user, "User has been deleted...");
            } catch (err) {
                res.status(500).json(err);
            }
        } catch (err) {
        res.status(404).json("User not found!");
        }
    } else {
        res.status(401).json("You can delete only your account!");
    }
};

//GET USER
exports.getUser = async (req, res) => {
    try {
        const user = await UserSchema.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
};

//GET ALL USER
exports.getAllUsers = async (req, res) => {
    const query = req.query.new;
    try {
        const users = query
            ? await UserSchema.find().sort({ _id: -1 }).limit(5)
            : await UserSchema.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};

//GET USER STATS
exports.UserStats = async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await UserSchema.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err);
    }
};
