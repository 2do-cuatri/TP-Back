var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  
  uderId: { type: Number,
        required: true
   },
  email: { type: String, 
           required: true},
  pass: { type: String,
          required: true
   },
  rol: {type: String, 
        enum : ['cliente','administrador'],
        required: true
   }
});

module.exports = mongoose.model('User', userSchema);