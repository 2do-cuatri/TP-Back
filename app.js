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
app.set('views', './views');
app.set('view engine','pug');

// Productos de prueba
app.get('/', function (req, res) {
  res.render('products', {
    products: [
      {
        category: "prueba",
        price: 150,
        name: "Prueba"
      },
      {
        category: "otro",
        price: 300,
        name: "Otro"
      }
    ],
    isLoggedIn: false
  });
});


app.get('/login', function (req, res) {
  res.render('login');
});

  