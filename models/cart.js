var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = new Schema({
  
  cartId: { type: Number,
        required: true },
  userId: { type: Schema.Types.ObjectId,
            ref: 'User',
            required: true},
  active: { type: Boolean,
          required: true }
});

module.exports = mongoose.model('Cart', cartSchema);