const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Seller = require('./sellerSchema')


router.post("/register", async(req,res)=>{
    
    let newSeller = {
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        sellerId : uuidv4(),
        acctype : "Seller"
    }
    
    console.log(newSeller);

    await Seller.create(newSeller)
    .then(response=>{
        console.log('Account Registered Succcessfully')
        res.status(200).send(response);
    })
    .catch(error=>{
        console.log("Error occur in Seller account adding");
    })
})

router.post("/login", async(req,res)=>{
    
    let sellerInfo = {
        email : req.body.email,
        password : req.body.password,
        acctype : "Seller"
    }

    console.log(sellerInfo);

    await Seller.findOne({email : sellerInfo.email})
    .then(response=>{
        if(response){
        console.log(response);
        console.log('Account Found Succcessfully')
        }
        res.status(200).send(response);
    })
    .catch(error=>{
        console.log("Error No seller found");
    })
})

module.exports = router;