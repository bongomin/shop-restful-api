const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../../models/Products')
const Product = mongoose.model('Product')

const { Fetch_all_products,
   Post_a_product,
   fetch_a_product
   , delete_Product,
   update_product
} = require('../../controllers/Products')

// Route for Fetching  Products 
router.get('/', Fetch_all_products);
// Route That  handles post requests to products
router.post('/', Post_a_product);
//Route for Fetching  a single Product  product
router.get('/:id', fetch_a_product)
// Route that Handles deleting a product 
router.delete('/:id', delete_Product)
// Route for put /patch request for updating
router.patch('/:id', update_product)

module.exports = router;