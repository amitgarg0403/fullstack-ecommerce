const express = require('express');
const router = express.Router();
// const Customer = require('./customerSchema')
const { v4: uuidv4 } = require('uuid');


router.post("/register", async(req,res)=>{
    
    let newCustomer = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      customerId: uuidv4(),
      acctype: "Customer",
    };
    
    console.log(newCustomer);

})

router.post("/login", (req,res)=>{
    
    let customerInfo = {
        email : req.body.email,
        password : req.body.password,
        acctype : "Customer"
    }
    
    console.log(customerInfo);
})

module.exports = router;
