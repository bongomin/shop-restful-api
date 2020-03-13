
const Order = require('../models/Oder');
const product = require('../models/Products');

// fetch all orders
exports.get_all_Orders = (req, res, next) => {
   Order.find()
      .populate('product', 'name')
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
}

// post order
exports.add_Order_Post = (req, res, next) => {
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
}

exports.fetch_Order_By_Order_id = (req, res, next) => {
   Order.findById(req.params.id)
      .populate('product')
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
               url: "localhost:3000/api/orders/" + order.id
            }
         })
      })
      .catch(error => {
         res.status(500).json({
            error: error
         })
      })
}

// delete order by its id
exports.delete_Order_by_id = (req, res, next) => {
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
}