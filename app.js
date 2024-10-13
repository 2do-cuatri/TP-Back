const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


mongoose.connect('mongodb://localhost:27017/').then((mongo) => {
  console.log("Conexion a la base de datos exitosa")
}).catch(err => {
  console.error("Error al conectar a la base de datos: ", err)
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Middleware
// Permite leer json directamente de los req.body
app.use(bodyParser.urlencoded({
  type: 'application/x-www-form-urlencoded',
  extended: true
}));
app.use(express.json())
// Custom
const { checkUser } = require('./middleware/auth');
app.use(checkUser)

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
    isLoggedIn: !!req.user
  });
});


app.get('/login', function (req, res) {
  res.render('login');
});

  