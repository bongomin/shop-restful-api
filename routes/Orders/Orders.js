const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../../models/Oder');
const product = require('../../models/Products')

// Routes that fetches all the orders 
router.get('/', (req, res, next) => {
   Order.find()
      .then(doc => res.status(200).json({
         message: "Get all Orders",
         Order: doc.map(data => {
            return {
               _id: data.id,
               product: data.product,
               qountity: data.quantity,
               request: {
                  Type: "GET",
                  Url: "localhost/api/orders" + data._id
               }
            }
         })
      }))
      .catch(err => res.status(500).json({ err }));
});


//Route that handles post orders
router.post('/', (req, res, next) => {
   product.findById(req.body.productId)
      .then(product => {
         if (!product) {
            return res.status(404).json(
               { message: "product not found here" }
            )
         }
         const order = new Order({
            _id: mongoose.Types.ObjectId(),
            qountity: req.body.qountity,
            product: req.body.productId
         });
         return order.save();
      })
      .then(result => {
         res.status(201).json({
            message: "Post Order EndPoint",
            count: result.length,
            CreatedOrder: {
               _id: result._id,
               product: result.product,
               qountity: result.quantity,
               request: {
                  Type: "POST",
                  Url: "localhost/api/orders" + result._id
               }
            }
         })
      })
      .catch(err => {
         console.log(err)
         res.status(500).json({
            error: err
         });
      });
});

// Route thatfetches a single order 
router.get('/:id', (req, res, next) => {
   Order.findById(req.params.id)
      .exec()
      .then(order => {
         if (!order) {
            return res.status(404).json({
               message: "Order Not Found"
            });
         }
         res.status(200).json({
            order: order,
            request: {
               Type: "GET",
               url: "localhost:3000/api/orders/id"
            }
         })
      })
      .catch(error => {
         res.status(500).json({
            error: error
         })
      })
});

// Route that Handles delete of  order
router.delete('/:id', (req, res, next) => {
   Order.remove({ _id: req.params.id })
      .exec()
      .then(doc => {
         res.status(200).json({
            message: "Order deleted",
            request: {
               type: "Delete",
               url: "localhost:3000/api/orders/id",
               body: {
                  productId: "ID",
                  qountity: "Number"
               }
            }
         })
      }
      )
      .catch(err => {
         res.json({
            err
         })

      })
});
module.exports = router;