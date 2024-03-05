const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name : {type: String, required: true},
    email : {type: String, required: true},
    password : {type: String, required: true},
    acctype : {type: String, default : "Customer"},  // default value for acctype
    customerId : String ,
    address : {
        street : String, 
        city : String ,
        pincode : Number,
        state : String ,
        mobile : Number
    }
});

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;