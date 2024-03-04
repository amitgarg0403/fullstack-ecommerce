const express = require("express");
const multer = require('multer');
const Product = require("./productSchema");
const router = express.Router();

const path = require('path');


// Define storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination directory for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Rename file with current timestamp
  }
});

// Function to filter only image files
const imageFilter = function (req, file, cb) {
  // Check if file is an image
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    // Reject file if it's not an image
    return cb(new Error('Only image files are allowed!'), false);
  }
  // Accept file if it's an image
  cb(null, true);
};

// Set up multer with options
const upload = multer({ storage: storage, fileFilter: imageFilter });

router.post('/', upload.single('image'), async(req, res) => {
    // The 'image' parameter should match the name attribute in your HTML form input field
    // This middleware will process the single file upload
    
    // Access uploaded file details from req.file
    let name = req.body.name;
    let price = req.body.price;
    let description = req.body.description;
    let sellerId = req.body.sellerId;
    let stock = req.body.stock;
    let image = req.file.filename;

    console.log(name + price + description + stock + image + sellerId);

    let newproduct = {
      name, price, description, stock, image, sellerId
    }

    console.log(newproduct);
    try{
      await Product.create(newproduct)
      console.log("Product added");
      res.status(200).send('File uploaded successfully!');
    }
    catch(error){
      console.log('Error occurred:', error);
      res.status(500).send('Error uploading file!');
    }

  });
  
router.put('/:_id', upload.single('image'), async(req, res) => {
    // The 'image' parameter should match the name attribute in your HTML form input field
    // This middleware will process the single file upload
    
    // Access uploaded file details from req.file
    let productId = req.params;
    let name = req.body.name;
    let price = req.body.price;
    let description = req.body.description;
    let sellerId = req.body.sellerId;
    let stock = req.body.stock;

    let updateProduct = {
      name, price, description, stock, sellerId
    }

    console.log(updateProduct);
    console.log(productId);

    try{
      await Product.findByIdAndUpdate(productId, updateProduct)
      console.log("Product Updated");
      res.status(200).send('File updated successfully!');
    }
    catch(error){
      console.log('Error occurred:', error);
      res.status(500).send('Error uploading file!');
    }

  });
  



// get product api
router.get("/", async (req, res) => {
  try {
    let productArr = await Product.find()
    res.status(200).send(productArr)
  } 
  catch (error) {
    console.log("Cant Get Products");
  }
});

// delete product api
router.delete('/:_id', async(req,res)=>{
  try{
    console.log(req.params);
    let response = await Product.findOneAndDelete(req.params)
    console.log(response)
    console.log('Product delete Success')
    res.status(200).send("Deleted Successfully")
  }
  catch(error){
    console.log("Error in Deletion process");
  }
})

module.exports = router;
