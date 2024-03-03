
const Products = ()=>{
    return(
        <div className="row">
            <h2 className="text-danger text-center"> Working on this page</h2>
            <div className="row">
                <div className="col"></div>
                <div className="col-3">
                    <input type="text" placeholder="Search Product Here..." className="form-control m-3"/>
                </div>
                <div className="col"></div>
            </div>

            {/* Display products */}
            <div className="row ms-5 mb-3">
                <div className="col-lg-2 text-center m-3">
                    <h5>Product Name</h5>
                    <img src="" alt="Product Img" height={100} width={100} /><br />
                    <small>Description</small>
                    <p>Rs. 00 </p>
                    <button className="btn btn-sm btn-warning">Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Products;