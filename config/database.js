const mongoose = require("mongoose");

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("You are connected");
    } catch (err) {
        console.log(err);
    }
};

module.exports = ConnectDB;