import { useEffect, useRef, useState } from "react";
import axios from "axios";

const CustomerApp = ()=>{
    const[addressInfo, updateAddressInfo] = useState({
        street : "", city : "" , pincode : "", state : "" , mobile : ""
    });
    const[customerDetail, updateCustomerDetail] = useState({
        name : "", email : "", password : "", customerId : "", acctype : "Customer", address : {}
    });
    const editRef = useRef(null);


    const[wishlist, updateWishlist] = useState([]);

    // Get all products from server
    // const getProducts = async() =>{
    //     let url = "http://localhost:5000/product";
    //     await axios.get(url)
    //     .then(response=>{ 
    //         console.log('Got All Product Succcessfully')
    //         updateAllProduct(response.data);
    //     })
    //     .catch(error=>{
    //         console.log("Error No product found");
    //     })
    // }

    const updateAddress =() =>{
        editRef.current.scrollIntoView( {behaviour:"smooth"})
        updateAddressInfo({
            street : customerDetail.address.street, 
            city : customerDetail.address.city ,
            pincode : customerDetail.address.pincode,
            state : customerDetail.address.state, 
            mobile : customerDetail.address.mobile, 
        })
    }

    const setAddress = ()=>{
       console.log(addressInfo);
       let updateData = addressInfo;
       let customerId = localStorage.getItem('customerId');
       let url = "http://localhost:5000/customer/"+ customerId;
       axios.put(url, updateData)
       .then(response=>{
        console.log("Address updated successfully");
        console.log(response.data);
        updateAddressInfo({street : "", city : "" , pincode : "", state : "" , mobile : ""})
       })
       .catch(error=>{
        console.log("Error in Address updation");
    })
    }

    const getCustomer = () =>{
        // let email = localStorage.getItem('email');
        let customerId = localStorage.getItem('customerId');
        // let name = localStorage.getItem('name');
        let url =  "http://localhost:5000/customer/"+ customerId;
        axios.get(url)
        .then(response=>{
            console.log('customer detail found');
            console.log(response.data);
            let customerInfo = response.data;
            updateCustomerDetail(customerInfo)
            
        })
        .catch(error=>{
            console.log("Error No customer found");
        })
    }

    useEffect(()=>{getCustomer();}, [addressInfo]);

    return(
        <div>
            <h1 className="text-center text-danger ">My Account</h1>
            <div className="row p-5">
                {/* Profile Card  */}
                <div className="card p-0">
                    <div className="card-header d-flex justify-content-between pt-2 pb-0" > 
                        <h4 className="text-dark"></h4> 
                        <h4 className="text-dark">Profile</h4> 
                        <h6 className="pt-1 ">Customer ID - {customerDetail.customerId}</h6> 
                    </div>
                    <div className="card-body pt-4">
                        <table class="table table-warning table-striped table-bordered border-dark text-center table-responsive">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Password</th>
                                    <th scope="col" className="text-center" colSpan={5}>Address - <i className="fa fa-edit fa-lg text-primary" onClick={updateAddress}></i></th>
                                </tr>
                                <tr>
                                    <th scope="row" colSpan={3}></th>
                                    <th >Street</th>
                                    <th>City</th>
                                    <th>Pincode</th>
                                    <th>State</th>
                                    <th>Mobile</th>
                                </tr>
                            </thead>
                            <tbody  class="table-group-divider">
                                <tr>
                                    <td>{customerDetail.name}</td>
                                    <td>{customerDetail.email}</td>
                                    <td>{customerDetail.password}</td>
                                    <td >{customerDetail.address.street}</td>
                                    <td>{customerDetail.address.city}</td>
                                    <td>{customerDetail.address.pincode}</td>
                                    <td>{customerDetail.address.state}</td>
                                    <td>{customerDetail.address.mobile}</td>
                                </tr>
                            </tbody>
                        </table>                       
                    </div>
                </div>
            </div>
            <div className="row p-5 pt-0">
                <div className="col-lg-5">
                    {/* Payment Details */}
                    <div className="card mb-4">
                        <div className="card-header text-center text-light bg-danger"> Payment Details</div>
                        <div className="card-body bg-light">
                            <h6 className="">Add Card Details</h6>
                            <div className="row">
                                <div className="col-lg-6 text-center">
                                    <div className="row m-3">
                                        <input type="text"  placeholder="Enter Card CVV" className="form-control"/>
                                        <br />
                                    </div>
                                    <div className="row m-3">
                                        <input type="text"  placeholder="Enter Card Number" className="form-control"/>
                                        <br />
                                    </div>
                                </div>
                                <div className="col-lg-6 text-center">
                                    <div className="row m-3">
                                        <input type="date"  placeholder="Enter Card Expiry" className="form-control"/>
                                    </div>
                                    <button className="btn btn-sm btn-primary">Verify</button>
                                </div>
                            </div>
                            <h6 className="">Add UPI address</h6>
                            <div className="row">
                                <div className="col-lg-8 text-center">
                                    <div className="row m-3">
                                        <input type="text"  placeholder="Enter UPI address" className="form-control"/>
                                        <br />
                                    </div>
                                </div>
                                <div className="col-lg-4 text-center">
                                    <br />
                                    <button className="btn btn-sm btn-primary">Verify</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Past Orders */}
                    <div className="card mt-2">
                        <div className="card-header text-center text-light bg-warning"> Past Orders </div>
                        <div className="card-body">
                            <div className="row ">
                                <p className="text-center m-2">No Order found!</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-7">
                    {/* Add Address */}
                    <div className="card mb-3" ref={editRef}>
                        <div className="card-header text-center text-light bg-primary"> Add Address</div>
                        <div className="card-body bg-light">
                            <div className="row">
                                <div className="row mb-3">
                                    <div className="col-lg-8">
                                        <p className="fw-bold mb-1"> Street</p>
                                        <input type="text" className="form-control"  onChange={e=>updateAddressInfo({...addressInfo, street : e.target.value})} name="street" value={addressInfo.street} />
                                    </div>
                                    <div className="col-lg-4">
                                        <p className="fw-bold mb-1"> City</p>
                                        <input type="text" className="form-control" onChange={e=>updateAddressInfo({...addressInfo, city : e.target.value})} name="city" value={addressInfo.city}/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-lg-4">
                                        <p className="fw-bold mb-1"> State</p>
                                        <input type="text" className="form-control"  onChange={e=>updateAddressInfo({...addressInfo, state : e.target.value})} name="state" value={addressInfo.state}/>
                                    </div>
                                    <div className="col-lg-4">
                                        <p className="fw-bold mb-1"> Pincode</p>
                                        <input type="text" className="form-control"  onChange={e=>updateAddressInfo({...addressInfo, pincode : e.target.value})} name="pincode" value={addressInfo.pincode}/>
                                    </div>
                                    <div className="col-lg-4">
                                        <p className="fw-bold mb-1"> Mobile</p>
                                        <input type="number" className="form-control" onChange={e=>updateAddressInfo({...addressInfo, mobile : e.target.value})} name="mobile" value={addressInfo.mobile}/>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-lg-4"></div>
                                    <div className="col-lg-4 text-center mt-1">
                                        <button className="btn btn-warning m-2" onClick={setAddress}> Update</button>
                                        <button className="btn btn-warning m-2" onClick={()=>updateAddressInfo({street : "", city : "" , pincode : "", state : "" , mobile : ""}) }> Reset </button>
                                    </div>
                                    <div className="col-lg-4"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Wishlist */}
                    <div className="card">
                        <div className="card-header text-center text-light bg-success"> Wishlist</div>
                        <div className="card-body">
                            <div className="row">
                                <p className="text-center m-4">No Product added in Wishlist</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default CustomerApp;