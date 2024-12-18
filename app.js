const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { Product } = require('./models/product')
const Cart = require('./models/cart');
const User = require('./models/user');
const Order = require('./models/order');
require('dotenv').config();

const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app); // Servidor HTTP necesario para Socket.IO
const io = new Server(server); // Instancia de Socket.IO

// Configuración de Socket.IO
io.on('connection', (socket) => {
  console.log(`Usuario conectado`);

  // Manejar mensajes del chat
  socket.on('chat', (message) => {
    io.emit('chat',message)
  });
});


mongoose.connect(process.env.MONGO_ATLAS_URL).then((mongo) => {
  console.log("Conexion a la base de datos exitosa")
}).catch(err => {
  console.error("Error al conectar a la base de datos: ", err)
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Middleware
// Permite leer json directamente de los req.body
app.use(bodyParser.urlencoded({
  type: 'application/x-www-form-urlencoded',
  extended: true
}));
app.use(express.json());
app.use(cookieParser());
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
    const { ...filters } = req.query;
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
    })
  } catch(err) {
    res.status(500).send(err.message)
  }
})

app.get('/admin', async (req, res) => {
    // Chequear que sea admin
    if (!req.user || req.user.rol !== 'administrador') return res.status(401).send('No tienes permisos para acceder a esta sección');
    //
    const { ...filters} = req.query;
    const products = await Product.find(filters);
    const users = await User.find();
    const orders = await Order.find();
    const categories = await Product.find().distinct('category')

    res.render('admin', {
      products,
      users,
      orders,
      categories,
    })
})


app.get('/login', function (req, res) {
  res.render('login');
});

// Nueva ruta para el chat
app.get('/chat', function (req, res) {
  res.render('chat');
});
