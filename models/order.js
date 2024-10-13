var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
  cartId: { type: Schema.Types.ObjectId,
            ref: 'Cart',
            required: true},
  date: { type: Date,
          default: Date.now,
          required: true },
  payment: { type: Number,
             required: true},
  status: {type:String,
           enum: ['procesando', 'enviado', 'cancelado'],
           required: true} 
});

module.exports = mongoose.model('Order', orderSchema);