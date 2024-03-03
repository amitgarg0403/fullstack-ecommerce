import axios from "axios";
import { useState } from "react";

const Authentication = () =>{
    const[userRegister, setUserRegister] = useState({
        name: "", email : "", password : "", acctype : "Customer"  
    })
    const[userLogin, setUserLogin] = useState({
        email : "", password : "", acctype : "Customer"  
    })

    //Register Seller
    const getRegister = async(e) =>{
        e.preventDefault();

        let userData = userRegister;
        let url = (userData.acctype === "Customer")? "http://localhost:5000/customer/register" : "http://localhost:5000/seller/register" ;
        console.log(userData, url)
        await axios.post(url, userData).then((response)=>{
            console.log(response.data);
        })
        .catch(err=> console.log(err))
    }
    
    //Seller Login
    const getLogin = async(e) =>{
        e.preventDefault();

        let userData = userLogin;
        let url = (userData.acctype === "Customer")? "http://localhost:5000/customer/login" : "http://localhost:5000/seller/login" ;
        console.log(userData, url)
        await axios.post(url, userData).then((response)=>{
            console.log(response.data);
            let userInfo = response.data
            localStorage.setItem("name", userInfo.name)
            localStorage.setItem("email", userInfo.email)
            localStorage.setItem("sellerId", userInfo.sellerId)
            localStorage.setItem("loginType", "seller")
            window.location.href = "/";
        })
        .catch(err=> console.log(err))
    }
    
    const  handleRegister = (e)=>{
        setUserRegister({...userRegister, [e.target.name] : e.target.value})
    }
    
    const  handleLogin = (e)=>{
        setUserLogin({...userLogin, [e.target.name] : e.target.value})
    }

    
    return(
        <div className="container-fluid bg-light">
            <div className="row p-5 m-5">
                <div className="col-lg-1"></div>

                <div className="col-lg-6 bg-dark text-warning pt-3">
                    <h3 className="text-center m-4"> REGISTER</h3>
                    <form>
                        <div className="row mt-3">
                            <div className="col"></div>
                            <div className="col-lg-3">
                                <p className=" fs-5 text-center"> NAME </p>
                            </div>
                            <div className="col-lg-6">
                                <input type="text" className=" form-control form-control-sm" onChange={handleRegister} name="name"/>
                            </div>
                            <div className="col"></div>
                        </div>
                        
                        <div className="row mt-3">
                            <div className="col"></div>
                            <div className="col-lg-3">
                                <p className=" fs-5 text-center"> ACC. TYPE </p>
                            </div>
                            <div className="col-lg-6">
                                <select className="form-control form-control-sm" onChange={handleRegister} name="acctype">
                                    <option value="Customer" className="fw-semibold">Customer</option>
                                    <option value="Seller" className="fw-semibold">Seller</option>
                                </select>
                            </div>
                            <div className="col"></div>
                        </div>

                        <div className="row mt-2">
                            <div className="col"></div>
                            <div className="col-lg-3">
                                <p className=" fs-5 text-center"> EMAIL </p>
                            </div>
                            <div className="col-lg-6">
                                <input type="email" className=" form-control form-control-sm" onChange={handleRegister} name="email"/>
                            </div>
                            <div className="col"></div>
                        </div>

                        <div className="row mt-2">
                            <div className="col"></div>
                            <div className="col-lg-3">
                                <p className=" fs-5 text-center"> PASSWORD </p>
                            </div>
                            <div className="col-lg-6">
                                <input type="password" className=" form-control form-control-sm" onChange={handleRegister} name="password"/>
                            </div>
                            <div className="col"></div>
                        </div>
                        
                        <div className="row mb-3 mt-3">
                            <div className="col-lg-4"></div>
                            <div className="col-lg-4 d-flex">
                                <button className="form-control d-inline bg-warning m-2" onClick={(e)=>getRegister(e)}> Register </button>
                                <button className="form-control m-2" type="reset"> Reset </button>
                            </div>
                            <div className="col-lg-4"></div>
                        </div>    
                    </form>
                </div>

        {/* =============       Login code      ========== */}

                <div className="col-lg-4 bg-warning pt-3">
                    <h3 className="text-center m-4"> LOGIN</h3>
                    <form>
                        <div className="row mt-3">
                            <div className="col"></div>
                            <div className="col-lg-6">
                                <label className="fw-bold"> Email</label>
                                <input type="text" className=" form-control form-control-sm"  onChange={handleLogin} name="email"/>
                            </div>
                            <div className="col"></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col"></div>
                            <div className="col-lg-6">
                                <label className="fw-bold"> Password </label>
                                <input type="text" className=" form-control form-control-sm"  onChange={handleLogin} name="password"/>
                            </div>
                            <div className="col"></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col"></div>
                            <div className="col-lg-6">
                                <label className="fw-bold"> Login as </label>
                                <select className="form-control form-control-sm" onChange={handleLogin} name="acctype">
                                    <option value="Customer" className="fw-semibold">Customer</option>
                                    <option value="Seller" className="fw-semibold">Seller</option>
                                </select>
                            </div>
                            <div className="col"></div>
                        </div>
       
                        <div className="row mb-3 mt-3">
                            <div className="col-lg-3"></div>
                            <div className="col-lg-6 d-flex">
                                <button className="form-control d-inline bg-dark m-2 text-white" onClick={(e)=>getLogin(e)}> Login </button>
                                <button className="form-control bg- m-2" type="reset"> Reset </button>
                            </div>
                            <div className="col-lg-3"></div>
                        </div>    
                    </form>
                </div>
                <div className="col-lg-2"></div>
            </div>
        </div>
    )
}

export default Authentication;