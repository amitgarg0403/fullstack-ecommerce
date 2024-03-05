const express = require('express');
const router = express.Router();
const Customer = require('./customerSchema')
const { v4: uuidv4 } = require('uuid');

// Customer Register post request
router.post("/register", async(req,res)=>{
    
    let newCustomer = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      customerId: uuidv4(),
      acctype: "Customer",
    };
    
    console.log(newCustomer);
    
    await Customer.create(newCustomer)
    .then(response=>{
        console.log('Account Registered Succcessfully')
        res.status(200).send(response);
    })
    .catch(error=>{
        console.log("Error occur in Customer account adding");
    })
})

// Customer Login post request
router.post("/login", async(req,res)=>{
    
    let customerInfo = {
        email : req.body.email,
        password : req.body.password,
        acctype : "Customer"
    }
    
    console.log(customerInfo);

    await Customer.findOne({email : customerInfo.email})
    .then(response=>{
        if(response)
        {
            console.log(response);
            console.log('Account Found Succcessfully')
        }
        res.status(200).send(response);
    })
    .catch(error=>{
        console.log("Error No seller found");
    })

})

// Customer data get request
router.get("/:id", async(req,res)=>{
    let customerId = req.params.id
    await Customer.findOne({customerId: customerId})
    .then(response=>{
        if(response)
        {
            console.log(response);
            console.log("Customer Found");
        }
        res.status(200).send(response);
    })
    .catch(error=>{
        console.log("Error No seller found");
    })
})

// Cutomer Address update request
router.put('/:id', async(req,res)=>{
    let customerID = {customerId : req.params.id};
    console.log(customerID);
    let addressInfo = {address : {
        street : req.body.street, 
        state: req.body.state , 
        city : req.body.city , 
        mobile : req.body.mobile , 
        pincode : req.body.pincode
    }}
    await Customer.findOne(customerID)
    .then(async(response)=>{
        console.log(response)
        let id = {_id : response._id}
        await Customer.findByIdAndUpdate(id, addressInfo)
        .then(response=>{
            console.log("Address Update Successfully");
            res.status(200).send(response);
        })
    })
    .catch(error=>{
        console.log("Error - address updation fail");
        console.log(error);
    })
})

module.exports = router;
