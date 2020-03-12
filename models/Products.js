const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductsSchema = new Schema({
   _id: mongoose.Schema.Types.ObjectId,
   name: String,
   price: Number

});
module.exports = mongoose.model('Product', ProductsSchema)

