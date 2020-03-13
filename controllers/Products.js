const mongoose = require('mongoose');
require('../models/Products')
const Product = mongoose.model('Product')

exports.Fetch_all_products = (req, res, next) => {
   Product.find()
      .select('name price id')
      .then(all_data => {
         if (all_data.length >= 0) {
            res.status(200).json({
               count: all_data.length,
               data: all_data.map(doc => {
                  return {
                     _id: doc.id,
                     name: doc.name,
                     price: doc.price,
                     request: {
                        type: "GET",
                        url: "localhost:3000/api/products" + doc.id

                     }

                  }
               })
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
}

// post a product
exports.Post_a_product = (req, res, next) => {
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
}

// fetch a single product
exports.fetch_a_product = (req, res, next) => {
   const id = req.params.id;
   Product.findById(id)
      .exec()
      .then(data => {
         if (data) {
            res.status(200).json({
               message: `data passed and recieved by ${req.params.id} is :`,
               result: {
                  id: data.id,
                  name: data.name,
                  price: data.price,
                  request: {
                     type: "GET",
                     url: "localhost:3000/api/products/" + data.id
                  }
               }
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
}

// delete a product
exports.delete_Product = (req, res, next) => {
   const product = req.params.id;
   Product.remove({
      _id: product
   })
      .exec()
      .then(deleted => {
         res.json({
            message: "deleted item",
            deleted: {
               id: deleted.id,
               name: deleted.name,
               price: deleted.price,
               request: {
                  type: "DELETE",
                  url: "localhost:3000/products/" + deleted.id
               }
            }
         })
      })
      .catch(err => {
         res.json({ err })
      })

}

// update a product
exports.update_product = (req, res, next) => {
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
            result: {
               name: result.name,
               price: result.price,
               request: {
                  type: "PATCH / UPDATE",
               }
            }
         })
      })
      .catch(err => {
         console.log(err)
         res.status(500).json({
            error: err
         })
      })

}
// ie sample request to postman
/**[
{
   "propName": "price","value":"170000"
   }

   ]* */