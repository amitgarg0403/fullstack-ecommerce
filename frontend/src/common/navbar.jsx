import { useEffect, useState } from "react";

const Navbar = () => {
  const[logintype, setLoginType]= useState("")

  const logout =()=>{
    localStorage.clear();
    window.location.reload();
  }

  useEffect(()=>{
    let type = localStorage.getItem("loginType");
    setLoginType(type);
  },[])
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid ms-3 me-3">
        <a className="navbar-brand" href="/"> <i className="fa fa-seedling fa-lg text-warning me-2"></i> Store </a>

        <button  className="navbar-toggler"  type="button"  data-bs-toggle="collapse"  data-bs-target="#navbarNav"  
        aria-controls="navbarNav"  aria-expanded="false"  aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active " aria-current="page" href="/showproducts"> Products </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active ms-3" aria-current="page" href="/cart"> <i className="fa fa-cart-shopping"></i> Cart </a>
            </li>
          </ul>

          <ul className="navbar-nav">         
            <li className="nav-item">
              
                {(logintype === "seller" || logintype === "customer") ? 
                (
                  <button className="btn btn-outline-warning  fw-bold " onClick={logout}>Welcome, {localStorage.getItem("name")} - Logout </button>
                ):
                (
                  <a className="nav-link active ms-3" aria-current="page" href="/auth"> Register / Login </a>
                )}
              
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
