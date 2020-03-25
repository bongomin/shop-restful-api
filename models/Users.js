const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UsersSchema = new Schema({
   _id: mongoose.Schema.Types.ObjectId,
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   }

});
module.exports = mongoose.model('User', UsersSchema)

