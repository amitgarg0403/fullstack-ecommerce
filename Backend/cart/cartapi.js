const express = require('express');
const router = express.Router();

const Cart = require('./cartSchema');


router.get("/:customerId", async(req,res)=>{
    let customerID = req.params;
    await Cart.findOne(customerID).then(response=>{
        if(response){
            console.log('Cart found');
            res.status(200).send(response);    
        }
    })
    .catch((error)=> console.log("Error in finding cart"))
})


// Add Cart Items
router.post("/:customerId", async(req,res)=>{
    let customerId = req.params.customerId;
    let cartItem = {
        name : req.body.name,
        qty : req.body.qty,
        price : req.body.price,
        description : req.body.description,
        image : req.body.image,
        productId : req.body.productId
    }
    console.log(cartItem);
    let enquiry = await Cart.findOne({"customerId": customerId})
    console.log(enquiry);
    if(!enquiry){
        console.log('No customer found');
        let cart = Cart({
            customerId,
            cartlist:[cartItem]
        });
        await cart.save();
        res.status(200).json({msg : "New cart created"})
        // cartItem["customerId"] = customerID.customerId;
        // console.log(cartItem);
    }else{
        console.log('Customer found');
        enquiry.cartlist.push(cartItem)
        await enquiry.save()
        res.status(200).json({msg : "New item in cart added"})
    }
    // let url = "http://localhost:5000/customer/"+ customerID.customerId;

})


// Delete cart Items
router.delete("/:customerId/:productId", async(req,res)=>{
    const {customerId, productId} = req.params;
    console.log(customerId);
    console.log(productId);
    // if all delete whole cart else delete individual item
    if(productId == 'All')
    {
       let cart =  await Cart.findOne({"customerId" : customerId})
        cart.cartlist.splice(0, cart.cartlist.length)
        await cart.save()
        .then(response=>{
            res.send({msg: "Complete cart deleted"})
        })
        .catch(error=>console.log('Error in Cart deletion'))
    }else{
       let cart =  await Cart.findOne({"customerId" : customerId})
       const productIndex = cart.cartlist.findIndex(item => item.productId === productId);
       cart.cartlist.splice(productIndex, 1)
       await cart.save()
       .then(response=>{
        res.status(200).json({msg: "Item deleted from server"})
        })
        .catch(error=>console.log("Error in Item deletion backend"))
    }
})

// Update Cart Items
router.put("/:customerId", async(req,res)=>{
    // find cart then find index of product then change that qty at the index
    updateProduct = req.body;
    console.log(updateProduct);
    customerID = req.params
    let cart = await Cart.findOne(customerID)
    console.log(cart);
    const productIndex = cart.cartlist.findIndex(item => item.productId === updateProduct.productId);
    console.log(productIndex);

    cart.cartlist[productIndex].qty = updateProduct.qty;
    await cart.save()
    .then(response=>{
        res.status(200).json({'msg': "Qty updated success"})
    })
    .catch(error=>console.log("Error in Qty change backend"))

})



module.exports = router;