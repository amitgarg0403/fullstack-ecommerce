import './App.css';
import Footer from './common/footer';
import Homepage from './common/homepage';
import Navbar from './common/navbar';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Products from './common/products';
import CustomerApp from './customer/customerapp';
import SellerDashboard from './seller/dashboard';
import Authentication from './common/authenticate';
import MyCart from './customer/cart';

function App() {
  let loginType = localStorage.getItem("loginType");

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' 
        element={(loginType== "customer")? <CustomerApp /> : (loginType== "seller")? <SellerDashboard /> : <Homepage />}></Route>
        
        <Route exact path='/auth' element={<Authentication />}></Route>
        <Route exact path='/showproducts' element={<Products />}></Route>
        <Route exact path='/cart' element={<MyCart />}></Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
