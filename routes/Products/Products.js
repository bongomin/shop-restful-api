const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../../models/Products')
const Product = mongoose.model('Product');
const checkAuthenticated = require('../../Auth/check-auth')

const { Fetch_all_products,
   Post_a_product,
   fetch_a_product
   , delete_Product,
   update_product
} = require('../../controllers/Products')

// Route for Fetching  Products 
router.get('/', checkAuthenticated, Fetch_all_products);
// Route That  handles post requests to products
router.post('/', checkAuthenticated, (req, res, next) => {
   const product = new Product({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price
   })
   product.save()
      .then(result => {
         res.status(200).json({
            message: "these are saved products",
            saved_product: {
               id: result.id,
               name: result.name,
               price: result.price,
               request: {
                  type: "POST",
                  url: "localhost:3000/products/" + result.id
               }
            }
         })
      })
      .catch(err => {
         res.json({
            err: err
         })
      })
});
router.post('/', Post_a_product);
//Route for Fetching  a single Product  product
router.get('/:id', fetch_a_product)
// Route that Handles deleting a product 
router.delete('/:id', delete_Product)
// Route for put /patch request for updating
router.patch('/:id', update_product)

module.exports = router;