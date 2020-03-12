const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../../models/Products')
const Product = mongoose.model('Product')

// Route for Fetching  Products 
router.get('/', (req, res, next) => {
   Product.find().
      then(all_data => {
         if (all_data.length >= 0) {
            res.status(200).json({
               message: "These are all the products in the database",
               data: all_data
            })
         }
         else {
            res.status(404).json({
               error: "No Products Found in the database"
            })
         }

      })
      .catch(err => {
         res.status(500).json({
            err: err
         })
      })
});

// Route That  handles post requests to products
router.post('/', (req, res, next) => {
   const product = new Product({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price
   })
   product.save()
      .exec()
      .then(result => {
         res.status(200).json({
            message: "these are saved products",
            saved_product: result
         })
      })
      .catch(err => {
         console.log(err)
         res.json({
            err: err
         })
      })
});

//Route for Fetching  a single Product  product
router.get('/:id', (req, res, next) => {
   const id = req.params.id;
   Product.findById(id)
      .exec()
      .then(data => {
         if (data) {
            res.status(200).json({
               message: `data passed and recieved by ${req.params.id} is :`,
               result: data
            });
         }
         else {
            res.status(500).json({
               message: `No Id of that sort is found Into the system`
            });
         }

      })
      .catch(err => {
         console.log(err)
         res.status(500).json({
            error: err
         })
      })
})

// Route that Handles deleting a product 
router.delete('/:id', (req, res, next) => {
   const product = req.params.id;
   Product.remove({
      _id: product
   })
      .exec()
      .then(deleted => {
         res.json({
            message: "deleted item",
            deleted: deleted
         })
      })
      .catch(err => {
         res.json({ err })
      })

})


// Route for put /patch request for updating
router.patch('/:id', (req, res, next) => {
   const id = req.params.id;
   const UpdateOps = {}
   for (const Ops of req.body) {
      UpdateOps[Ops.propName] = Ops.value;
   }
   Product.update({ _id: id }, { $set: UpdateOps })
      .exec()
      .then(result => {
         res.status(200).json({
            message: "Upating data ",
            result: result
         })
      })
      .catch(err => {
         console.log(err)
         res.status(500).json({
            error: err
         })
      })

})

// ie sample request to postman
/**[
{
   "propName": "price","value":"170000"
   }
   
   ]* */








module.exports = router;