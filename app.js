const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Product } = require('./models/product')
const Cart = require('./models/cart');
const User = require('./models/user');
const Order = require('./models/order');


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
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/products', productRoutes);
app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

app.use('/static', express.static('public'))
//Vistas
app.set('views', './views');
app.set('view engine','pug');

app.get('/', async function (req, res) {
    const { userId, ...filters} = req.query;
    try {
        const products = await Product.find(filters);
        const categories = await Product.find().distinct('category')
        res.render('products', {
          products,
          categories,
          isLoggedIn: !!req.user
        });
    } catch(err) {
        res.send(500, err.message)
    }
});

app.get('/checkout/:cartId', async (req, res) => {
  try {
    const carrito = await Cart.findById(req.params.cartId);
    if (!carrito) res.status(404).send("Carrito no encontrado!");
    if (!req.user || !carrito.userId.equals(req.user._id)) res.status(401).send('Parece que este no es tu carrito!');
    res.render('cart', {
      carrito,
      userId: req.user._id
    })
  } catch(err) {
    res.status(500).send(err.message)
  }
})

app.get('/admin', async (req, res) => {
    // Chequear que sea admin

    //
    const products = await Product.find();
    const users = await User.find();
    const orders = await Order.find();
    

    res.render('admin', {
      products,
      users,
      orders,
      userId: req.user._id
    })
})


app.get('/login', function (req, res) {
  res.render('login');
});

  