const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
        },
        username: {
            type: String,
            required: true,
            min: 4,
            max: 30,
        },
        avatar: {
            type: String,
            default: "",
        },
        email: {
            type: String,
            required: true,
            unique: true,
            max: 30,
        },
        password: {
            type: String,
            required: true,
        },
        address:{type:String},
        isAdmin: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema)