import { useEffect, useRef, useState } from "react";
import axios from 'axios'
import ReactPaginate from "react-paginate";

const SellerDashboard = ()=>{
    //for upload
    const[newProduct, setnewProduct] = useState({
        name : "", image : "", price : "", description : "", sellerId : "", stock : ""
    })
    // for display product
    const[allProduct, updateAllProduct] = useState([]);
    // for edit product
    const editRef = useRef(null);
    const[editProductId, updateEditProductId] = useState("");

    //Uploading New product & Edit existing product combine
    const uploadForm = (e)=>{
        e.preventDefault();
        // storing data in form
        const formData = new FormData();
        formData.append("name", newProduct.name)
        formData.append("image", newProduct.image)
        formData.append("price", newProduct.price)
        formData.append("description", newProduct.description)
        formData.append("sellerId", localStorage.getItem('sellerId'))
        formData.append("stock", newProduct.stock)

        console.log(Object.fromEntries(formData));

        let url = (editProductId)? `http://localhost:5000/product/${editProductId}` : "http://localhost:5000/product"
        console.log(url);
        // ternary operator for put or post data 
        (editProductId)?
        (
            axios.put(url, formData, {headers: {'Content-Type': "multipart/form-data"}})
            .then(response=>{
            console.log('Product Updated Successfully');
            setnewProduct({
                name : "", image : "", price : "", description : "", sellerId : "", stock : ""
            })
            document.getElementById('image-upload').value = null;
            updateEditProductId("")
            getProducts();
        })
        ) 
        :
        (
            axios.post(url, formData, {headers: {'Content-Type': "multipart/form-data"}})
            .then(response=>{
            console.log('Product Uploaded Successfully');
            setnewProduct({
                name : "", image : "", price : "", description : "", sellerId : "", stock : ""
            })
            document.getElementById('image-upload').value = null;
            getProducts();
        })
        )

    }

    // Add New Product handles
    const handleField = (e)=>{
        setnewProduct({...newProduct, [e.target.name]: e.target.value})
    }
    
    const handleImage = (e)=>{
        setnewProduct({...newProduct, image: e.target.files[0] })
    }

    // Get all products from server
    const getProducts = async() =>{
        let url = "http://localhost:5000/product";
        await axios.get(url)
        .then(response=>{ 
            console.log('Got All Product Succcessfully')
            updateAllProduct(response.data);
        })
        .catch(error=>{
            console.log("Error No seller found");
        })
    }

    // Delete Product
    const delProduct = async(id) =>{
        alert(id);
        let url = "http://localhost:5000/product/"+ id;
        await axios.delete(url)
        .then(response=>{ 
            console.log('Deleted Product Successfully')
            getProducts();
        })
        .catch(error=>{
            console.log("Error in Deletion");
        })
    }

    // Edit Product
    const editProduct = (product) =>{
        console.log(product._id)
        setnewProduct({...product, image: "" });
        updateEditProductId(product._id);
        editRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    // Reset Button working
    const handleReset = () => {
        document.getElementById('image-upload').value = null;
        setnewProduct({
            name : "", image : "", price : "", description : "", sellerId : "", stock : ""
        });
        updateEditProductId("");
      };


    //this code will calculate number of product from Per_Page then, pages display as required
        const PER_PAGE = 10;
        const [currentPage, setCurrentPage] = useState(0);
        function handlePageClick({ selected: selectedPage }) {
            setCurrentPage(selectedPage)
        }
        const offset = currentPage * PER_PAGE;
        const pageCount = Math.ceil(allProduct.length / PER_PAGE);



    useEffect(()=>{getProducts()},[]);
    

    return(
        <div className="container-fluid">
            <h1 className="text-center text-warning">Seller Dashboard</h1>
            <div className="row p-4">
                <div className="col-lg-5" >
                    <form onSubmit={uploadForm} encType='multipart/form-data'>
                       <div className="card" ref={editRef}>
                            <div className="card-header bg-danger text-light text-center" > {(editProductId)? "Edit Product" : "New Product Upload"}</div>
                            <div className="card-body p-3 bg-light">
                                <div className="row mb-3">
                                    <div className="col-lg-8">
                                        <p className="fw-bold mb-1"> Product Name</p>
                                        <input type="text" className="form-control" onChange={handleField} name="name" value={newProduct.name}/>
                                    </div>
                                    <div className="col-lg-4">
                                        <p className="fw-bold mb-1"> Product Price</p>
                                        <input type="Number" className="form-control" onChange={handleField} name="price" value={newProduct.price}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <p className="fw-bold mb-1"> Product Stock</p>
                                        <input type="Number" className="form-control" onChange={handleField} name="stock" value={newProduct.stock}/>
                                    </div>
                                    <div className="col-lg-8">
                                        <p className="fw-bold mb-1"> Product Image <small className="text-danger fst-italic fw-normal">{(editProductId)? " - Can't change Image": ""}</small></p>
                                        <input type="file" className="form-control " name="image" id="image-upload" onChange={handleImage}/>
                                    </div>
                                </div>
                                <div className="row mb-3 p-3">
                                        <p className="fw-bold mb-1">Product Description</p>
                                        <textarea name="description" id="" cols="30" rows="3" className="form-control" onChange={handleField} value={newProduct.description}></textarea>   
                                </div>
                                <div className="row mb-1">
                                    <div className="col-lg-6">
                                        <button className="form-control btn btn-danger"> {(editProductId)? "Update" : "Upload"} </button>
                                    </div>
                                    <div className="col-lg-6">
                                        <button className="form-control" type="reset" onClick={handleReset}> Reset </button>
                                    </div>
                                </div>                                
                            </div>
                       </div>
                    </form>
                </div>
                <div className="col-lg-7">
                    <div className="card">
                            <div className="card-header bg-primary text-light text-center"> Order Management</div>
                            <div className="card-body p-3">
                                <div className="row p-3 text-center">
                                    <div className="col"></div>
                                    <div className="col-lg-4 mb-3">
                                        <div className="container bg-light p-4">Order completed</div>  
                                    </div>
                                    <div className="col-lg-4 mb-3">
                                        <div className="container bg-light p-4">Order pending</div>
                                    </div>
                                    <div className="col"></div>
                                </div>
                            </div>
                       </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    <h2 className="text-center text-danger">Total Products - {allProduct.length}</h2>
                    {/* Display products */}
                    <div className="row ms-5 mb-3">
                        {
                            allProduct.slice(offset, offset + PER_PAGE).map((product,index)=>{
                                return(
                                    <div className="col-lg-2 text-center m-3 bg-light shadow p-3" key={index}>
                                        <h5 className="text-danger">{(product.name).toUpperCase()}</h5>
                                        <img src={`http://127.0.0.1:3001/Backend/uploads/${product.image}`} alt="Product Img" height={100}  /><br />
                                        <small>{product.description}</small>
                                        <p className="fw-bold">Rs. {product.price} </p>
                                        <p className="fw-semibold text-danger">Stock Left - {product.stock} </p>
                                        <div className="row">
                                            <div className="col text-center">
                                                <button className="btn btn-sm  m-3" onClick={editProduct.bind(this, product)}> <i className="fa fa-edit fa-xl"></i> </button>
                                                <button className="btn btn-sm  m-3" onClick={delProduct.bind(this, product._id)}> <i className="fa fa-trash fa-xl"></i> </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
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
    )
}

export default SellerDashboard;