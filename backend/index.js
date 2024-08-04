const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const FRONTEND_URL ='https://e-commerce-frontend-2o32.onrender.com';

app.use(
  express.json()
);
app.use(
  cors()
);

// Database connection with Mongodb
mongoose.connect(
  "mongodb+srv://vedantdange:Vedant2003@cluster0.bpzfm00.mongodb.net/e-commerce"
);

// Image storage Engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Creating Upload endpoint for images
app.use(`/images`, express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `${FRONTEND_URL}/images/${req.file.filename}`,
  });
});

// Creating Schema for storing
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  Available: {
    type: Boolean,
    default: true,
  },
});

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  // Saving product in database
  await product.save();
  console.log("Save");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// Creating API for deleting Product
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Product is Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// Creating API for getting all products
app.get("/allproduct", async (req, res) => {
  let products = await Product.find({});
  console.log("All products are fetched");
  console.log(products);
  res.send(products);
});

// Creating Schema for Users
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Creating API for registering users
app.post("/signup", async (req, res) => {
  // Check if the email already exists
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({
        success: false,
        error: "Existing user found with same email address",
      });
  }

  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart
  });
  // Saving user in database
  await user.save();

  const data = {
    user: {
      id: user.id
    }
  }
  // Creating token
  const token = jwt.sign(data, 'secret_ecom');
  res.json({ success: true, token });
});

// Creating Endpoint for user login
app.post('/login', async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {

      const data = {
        user: {
          id: user.id
        }
      }
      const token = jwt.sign(data, 'secret_ecom');
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong Password" });
    }
  } else {
    res.json({ success: false, errors: "User Not Found" });
  }
});

// Creating middleware to fetch user
const fetchUser = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ errors: 'Please authenticate using a valid token' });
  }

  try {
    const data = jwt.verify(token, 'secret_ecom');
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).send({ errors: 'Please authenticate using a valid token' });
  }
};

// Creating Endpoint for adding products to cart
app.post('/addtocart', fetchUser, async (req, res) => {
  console.log(req.body, req.user);
  console.log("Added", req.body.itemId)
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.json({ message: "Added" });
});

// Creating endpoint to remove product from cart
app.post('/removefromcart', fetchUser, async (req, res) => {
  console.log("Removed", req.body.itemId)
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.json({ message: "Removed" });
});

// Creating endpoint to get cart data
app.post('/getcart', fetchUser, async (req, res) => {
  console.log("Get Cart");
  let userData = await Users.findOne({ _id: req.user.id })
  res.json(userData.cartData);
});

// Creating Endpoint for new Collection
app.get('/newcollection', async (req, res) => {
  let products = await Product.find({});
  // Now we will execute the new collection or last 8 products
  let newcollection = products.slice(1).slice(-8);
  console.log("New Collection Fetched");
  res.send(newcollection)
});

// Creating endpoint for Popular in women
app.get('/popularinwomen', async (req, res) => {
  const products = await Product.find({ category: 'women' });
  const popular = products.slice(0, 4);
  console.log("Popular in Women Fetched");
  res.send(popular);
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on port " + port);
  } else {
    console.log("Error: " + error);
  }
});
