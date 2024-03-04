const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name : {type: String, required: true},
    email : {type: String, required: true},
    password : {type: String, required: true},
    acctype : "Customer",
    customerId : "" 
});

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;