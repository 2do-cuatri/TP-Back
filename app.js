const express = require('express');
const app = express();

const PORT = 8000;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
 });

const authRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

app.use('/productos', productRoutes);
app.use('/auth', authRoutes);

//Vistas
const pug = require('pug'); //no se si esto va
app.set('views', './views');
app.set('view engine','pug');

app.get('/', function (req, res) {
  res.render('products');
});
app.get('/login', function (req, res) {
  res.render('login');
});

  