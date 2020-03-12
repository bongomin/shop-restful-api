const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductsSchema = new Schema({
   _id: mongoose.Schema.Types.ObjectId,
   name: { type: String, required: true },
   price: { type: Number, required: true }

});
module.exports = mongoose.model('Product', ProductsSchema)

