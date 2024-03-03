const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(cors());


// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/EcommerceDB')
.then(response=>{ console.log("MongoDB is connected")})
.catch(error=>{ console.log("Error in connecting MongoDB")})

app.get("/", (req,res)=> res.send("Hello World"));


const productRouter = require("./product/productapi")
app.use("/product", productRouter );


const SellerRouter = require("./seller/sellerapi")
app.use("/seller", SellerRouter);


app.listen("5000", ()=>{console.log("Server started at Port 5000")})