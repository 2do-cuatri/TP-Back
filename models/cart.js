var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId,
            ref: 'User',
            required: true},
  active: { type: Boolean,
          required: true }
});

module.exports = mongoose.model('Cart', cartSchema);