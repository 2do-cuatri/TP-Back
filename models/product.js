var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const productSchema = new Schema({
  category: { type: String,
              required: true },
  name: { type: String,
          required: true},
  price: { type: Number,
           required: true},
  stock: {type: Number,
          required: true},
  description: {type: String},

});

module.exports = {
        Product: mongoose.model('Product', productSchema),
        productSchema
}