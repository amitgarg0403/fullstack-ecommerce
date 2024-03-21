import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const Products = ()=>{
    const[productlist, updateProductlist] = useState([]);
    const[cartlist, updateCartlist] = useState([]);

    const getProduct = () =>{
        let url = "http://localhost:5000/product";
        fetch(url)
        .then(response=>response.json())
        .then(resultArr=>{
            updateProductlist(resultArr);
        })

    }

    const getCart = ()=>{
        let customerID = localStorage.getItem('customerId');
        if(!customerID)
        {
            console.error("Customer ID not found, Need to login first");
            alert('Need to Login first!')
            return;
        }
        let url = "http://localhost:5000/cart/"+ customerID;
        axios.get(url)
        .then(response=>{
            console.log(response.data);
            if(response.data.length == 0){
                console.log("Your cart is Empty!")
                return;
            }
            let cartArray = response.data.cartlist;
            updateCartlist(cartArray);

        })
        .catch(error=>{
            console.log("Error in finding cart on product page");
        })


    }
    const addToCart = async(product) =>{
        let customerID = localStorage.getItem('customerId');
        if(!customerID)
        {
            console.error("Customer ID not found, Need to login first");
            alert('Need to Login first!')
            return;
        }
            let cartItem = {
                name: product.name,
                image: product.image,
                price: product.price,
                qty: 1,
                description: product.description,
                productId: product._id
            }

            // check for duplicate product
            if (cartlist.find(item => item.productId === cartItem.productId)) {
                alert("Item already in cart");
            } else {
                updateCartlist(prevlist => [...prevlist, cartItem]);
                let url = "http://localhost:5000/cart/"+ customerID;
                await axios.post(url, cartItem)
                .then(response=>{
                    console.log(response.data.msg)
                    alert("Added to cart");
                })
                .catch(error=>{
                    alert("Error Item Already Exist!");
                })
            }   
    }


    // for Pagination
    //this code will calculate number of product from Per_Page then, pages display as required
    const PER_PAGE = 4;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(productlist.length / PER_PAGE);


    useEffect(()=>{
        console.log(cartlist);
        getProduct();
    }, [cartlist])

    useEffect(()=>{
        getCart()
    }, []);

    return (
            <div className="row">
                <h4 className="text-danger text-center m-4"> Product found - {productlist.length}</h4>
                <div className="row">
                    <div className="col"></div>
                    <div className="col-3 mb-4">
                        <input
                        type="text"
                        placeholder="Search Product Here..."
                        className="form-control m-3"
                        />
                    </div>
                    <div className="col"></div>
                </div>
                {/* Display products */}
                <div className="row ms-auto mb-3">
                    {productlist.slice(offset, offset + PER_PAGE).map((product, index) => {
                        return (
                        <div className="col-lg-3 text-center p-1" key={index}>
                            <h5>{product.name}</h5>
                            <img
                            src={`http://127.0.0.1:3001/Backend/uploads/${product.image}`}
                            alt="Product Img"
                            height={120} className="mb-2"
                            />
                            <br />
                            <small>{product.description}</small>
                            <p className="mt-2 fw-bold">Rs. {product.price} </p>
                            <button className="btn btn-sm btn-warning" onClick={addToCart.bind(this, product)}>Add to Cart</button>
                        </div>
                        );
                    })}
                </div>

                {/* Pagination code main */}
                <div className="mb-4 mt-4">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination  justify-content-center"}
                    pageClassName={"page-item "}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active primary"}
                />
                </div>
                
            </div>
    );
}

export default Products;