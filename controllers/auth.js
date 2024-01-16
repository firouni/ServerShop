const UserSchema = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//REGISTER
exports.Register = async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body;
        const found = await UserSchema.findOne({ email });
        if (found) {
            return res.status(400).json({ msg: "existed user" });
        }

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPass = bcrypt.hashSync(req.body.password, salt);
        const newUser = new UserSchema({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });

        const payload = { id: newUser._id };
        let token = jwt.sign(payload, process.env.secretKey, { expiresIn: "2h" });
        newUser.save();
        res.status(201).json({ newUser, token, msg: "welcome onBoard" });
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "something wrong"});
    }
};

//LOGIN
exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const found = await UserSchema.findOne({ email });
        if (!found) {
            return res.status(404).json({ msg: "User does not exist." });
        }

        const match = await bcrypt.compareSync(req.body.password, found.password);
        if (!match) {
            return res.status(400).json({ msg: "Invalid credentials." });
        }

        const payload = {
            id: found._id,
            isAdmin: found.isAdmin
        };
        var token = jwt.sign(payload, process.env.secretKey, { expiresIn: "2d" });
        delete found.password;
        res.status(201).json({ msg: "Welcome", token, found });
    } catch (err) {
        res.status(500).json(err);
    }
};
