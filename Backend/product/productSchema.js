const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name : {type: String, required: true},
    image : String,
    price : Number,
    description : String,
    sellerId : String,
    stock : Number
})

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;