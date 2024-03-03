const mongoose = require('mongoose');

const SellerSchema = new mongoose.Schema({
    name : {type: String, required: true},
    email : {type: String, required: true},
    password : {type: String, required: true},
    acctype : { type: String, default: "Seller" }, // Default value for acctype
    sellerId: String 
});

const Seller = mongoose.model("Seller", SellerSchema);

module.exports = Seller;