const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const OrderSchema = new Schema({
   _id: mongoose.Schema.Types.ObjectId,
   product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
   },
   qountity: { type: Number, default: 1 }
})


module.exports = mongoose.model('Order', OrderSchema);