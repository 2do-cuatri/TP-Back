var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  category: { type: String,
              required: true },
  name: { type: String,
          required: true},
  price: { type: Number,
           required: true},
  stock: {type: Number,
          required: true},
  description: {type: String}
});

module.exports = mongoose.model('Product', productSchema);