import { useEffect, useState } from "react";
import axios from "axios";

const MyCart = ()=>{
    const[cartItems, updateCartItems] = useState([])
    const[message, updateMessage] = useState('')
    const[amount, updateAmount] = useState("")

    // Display all cart items
    const getCart = () =>{
        let customerID = localStorage.getItem('customerId');
        if(!customerID)
        {
            console.error("Customer ID not found, Need to login first");
            alert('Need to Login first!')
            updateMessage("No Item in Cart")
            return;
        }
        let url = "http://localhost:5000/cart/"+ customerID;
        axios.get(url)
        .then(response=>{
            console.log(response.data);
            if(response.data.length == 0){
                updateMessage("Your cart is Empty!")
                return;
            }
            let cartArray = response.data.cartlist;
            updateCartItems(cartArray);

        })
        .catch(error=>{
            console.log("Error in cart display");
        })

    }

    const qtyHandler = (action, item) =>{
        
        let newQty = (action === "+") ? (item.qty + 1) : (item.qty - 1)
        console.log(newQty)
        let newItem = {...item, qty: newQty};
        
        if(newQty == 0 )
        {
            // call for delete api
            delItem(item.productId)
        }else {
            const updatedCartItems = cartItems.map(product => {
                if (product.productId === item.productId) {
                    return { ...product, qty: newQty };
                }
                return product;
            });
            
            updateCartItems(updatedCartItems);
        // const productIndex = cartItems.findIndex(product=> product.productId == item.productId)
        // cartItems[productIndex].qty = newQty
        // let updatedCart = cartItems
        // updateCartItems(updatedCart)

        // change qty in api file on server
            let customerID = localStorage.getItem('customerId');
            let url = "http://localhost:5000/cart/"+ customerID;
            axios.put(url, newItem)
            .then(response=>{
                console.log(response.data)
                getCart();
            })
            .catch(error=>console.log('Error in qty handler'))
        }
    }

    const checkout = () =>{
        alert('Thank you for placing order!')
        window.location.href = "/";
    }


    const delItem = (productId) =>{
        alert(productId)
        let customerID = localStorage.getItem('customerId');
        let url = "";
        if(productId !== "All"){
            url = "http://localhost:5000/cart/"+ customerID + "/"+ productId;
        }
        else{
            url = "http://localhost:5000/cart/"+ customerID + "/All";
        }
        axios.delete(url)
        .then(response=>{
            console.log('Item(s) deleted from cart')
            getCart();
        })
        .catch(error=>console.log('Error in deletion'))
    }

    useEffect(()=>{
        getCart();
    },[])

    useEffect(()=>{
        let sum = 0
        cartItems.map(item=>{
            sum += (item.qty*item.price)
            updateAmount(sum);
        })
    },[cartItems])

    return(
        <div className="container-fluid p-3">
            <h3 className="text-center m-3">Cart Page</h3>
            <h3 className="text-center m-3 text-danger">{message}</h3>

            <div className="row mb-5 p-5 ">
                <div className="col-lg-9 bg-light rounded-start-3 p-3 ms-auto">
                    <div className="d-flex justify-content-between" > 
                        <h6 className="text-dark">Shopping Cart</h6> 
                        <h6 className="text-dark"></h6> 
                        <h6 className="text-danger btn" onClick={delItem.bind(this, "All")}>Remove All</h6> 
                    </div>
                    <hr />
                    {/* Cart Products */}
                    {cartItems.map((item, index)=>{
                        return(
                                <div className="row mb-3" key={index}>
                                    <div className="col-lg-2 p-2 text-center">
                                        <img src={`http://127.0.0.1:3001/Backend/uploads/${item.image}`} alt="Image BLock" height={60} />
                                    </div>

                                    <div className="col-lg-3">
                                        <h5 className="fw-bold mb-0">{item.name}</h5>
                                        <small className="m-0 p-0">1 Kg</small>
                                        <p className="m-0 p-0">{item.description}</p>
                                    </div>

                                    <div className="col-lg-2 pt-2">
                                        <h5 className="pt-1 m-3">₹ {item.price}</h5>
                                    </div>

                                    <div className="col-lg-2 d-flex pt-4 ps-3">
                                        <i className="fa fa-square-plus fa-lg m-3" onClick={qtyHandler.bind(this, "+", item)}></i> 
                                        <p className="fw-semibold fs-5"> {item.qty} </p> 
                                        <i className="fa fa-square-minus fa-lg m-3" onClick={qtyHandler.bind(this, "-", item)}></i>
                                    </div>

                                    <div className="col-lg-2 pt-2">
                                        <h5 className="pt-1 m-3">₹ {item.price * item.qty}</h5>
                                    </div>

                                    <div className="col-lg-1 d-flex pt-4 text-center">
                                        <i className="fa fa-trash fa-lg m-3" onClick={delItem.bind(this, item.productId)}></i> 
                                    </div>
                                </div>
                        )
                    })
                    }
                </div>
                <div className="col-lg-3 bg-warning d-flex flex-column justify-content-between rounded-end-3 p-3 me-auto">
                        <div>
                            <h6>Summary</h6>
                            <hr />
                            <div className="d-flex justify-content-between mb-2" > 
                                <h6 className="text-dark">TOTAL ITEM</h6> 
                                <h6 className="text-dark"></h6> 
                                <h6 className=""> {cartItems.length} NOS</h6> 
                            </div>

                            <small className="m-1 fw-bold">Shipping Mode</small>
                            <div className="row mb-2 p-2">
                                <select className="form-control form-control-sm">
                                    <option value="">Standard Shipping</option>
                                    <option value="">Express Shipping</option>
                                    <option value="">1-Day Shipping</option>
                                </select>
                            </div>
                            <small className="m-1 fw-bold">Apply Coupon Code</small>
                            <div className="row mb-2 p-2">
                                <input type="text" placeholder="Enter Coupon Code here" className="form-control form-control-sm" />
                            </div>
                        </div>
                    
                        <div>
                            <hr />
                            <div className="d-flex justify-content-between mb-2" > 
                                <h6 className="text-dark">TOTAL PRICE</h6> 
                                <h6 className="text-dark"></h6> 
                                <h6 className="">₹ {amount}.00</h6> 
                            </div>
                            <div className="row m-3 p-2 mb-0">
                                <div className="col"></div>
                                <div className="col">
                                    <button className="btn btn-dark btn-lg" onClick={checkout}> Checkout</button>
                                </div>
                                <div className="col"></div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default MyCart;