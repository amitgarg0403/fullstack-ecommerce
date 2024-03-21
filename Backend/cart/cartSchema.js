const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    customerId : String,
    cartlist: [{
        name: String,
        qty: {type: Number, default:1},
        description: String,
        image : String,
        productId : String,
        price : Number
    }]
})

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;