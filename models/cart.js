var mongoose = require('mongoose');
const { productSchema } = require('./product');
var Schema = mongoose.Schema;

var cartSchema = new Schema({
      userId: { type: Schema.Types.ObjectId,
                  ref: 'User',
                  required: true},
      active: { type: Boolean,
            required: true },
      products: [{
            product: productSchema,
            quantity: Number
      }]
});

module.exports = mongoose.model('Cart', cartSchema);