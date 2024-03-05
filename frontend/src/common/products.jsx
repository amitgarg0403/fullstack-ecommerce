import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const Products = ()=>{
    const[productlist, updateProductlist] = useState([])

    const getProduct = () =>{
        let url = "http://localhost:5000/product";
        fetch(url)
        .then(response=>response.json())
        .then(resultArr=>{
            console.log(resultArr)
            updateProductlist(resultArr);
        })

    }

    const addToCart = (id) =>{
        alert('product added to cart'+ id)

    }

    //this code will calculate number of product from Per_Page then, pages display as required
    const PER_PAGE = 4;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(productlist.length / PER_PAGE);


    useEffect(()=>{
        getProduct();
    }, [])
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
                            <button className="btn btn-sm btn-warning" onClick={addToCart.bind(this, product._id)}>Add to Cart</button>
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