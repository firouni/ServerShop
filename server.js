const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const ConnectDB = require("./config/database");
const AuthRouter = require("./routes/auth");
const UserRouter = require("./routes/user");
const ProductRouter = require("./routes/product");
const CartRouter = require("./routes/cart");
const OrderRouter = require("./routes/order");
const stripeRoute = require("./routes/stripe");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
dotenv.config();
require("dotenv").config();
ConnectDB();

app.use("/images", express.static(path.join(__dirname, "/images/")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        //cb(null, req.body.name);
        cb(null, Date.now() + path.extname(file.originalname))
        console.log(file)
    },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), (req, res, next) => {
    const img = {
        title: req.body.title,
        productPic: {
            data: fs.readFileSync(path.join(__dirname + '/images/' + req.file.filename)),
            contentType: 'image/png/jpeg'
        }
    }
    productPicSchema
        .create(img)
        .save()
        .then(() => {
            res.status(200).json("File has been uploaded");
        })
        .catch((err) => console.log(err))
});

app.use("/api/auth", AuthRouter );
app.use("/api/users", UserRouter );
app.use("/api/products", ProductRouter);
app.use("/api/carts", CartRouter );
app.use("/api/orders", OrderRouter);
app.use("/api/checkout", stripeRoute);

app.listen(port, (err) => {
    err ? console.log(err) : console.log(`Server is running on ${port}.`);
});