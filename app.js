const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Product } = require('./models/product')


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
const cartRoutes = require('./routes/cartRoutes')

app.use('/productos', productRoutes);
app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);

app.use('/static', express.static('public'))
//Vistas
app.set('views', './views');
app.set('view engine','pug');

// Productos de prueba
app.get('/', async function (req, res) {
    const { userId, ...filters} = req.query;
    try {
        const products = await Product.find(filters);
        res.render('products', {
          products,
          isLoggedIn: !!req.user
        });
    } catch(err) {
        res.send(500, err.message)
    }
});


app.get('/login', function (req, res) {
  res.render('login');
});

  