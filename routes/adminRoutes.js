const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const userController = require('../controllers/userController');
const orderController = require('../controllers/orderController');

//Ruta para listar todos los productos
router.get('/products', productController.getProducts);

// Ruta para agregar productos 
router.get('/products', productController.postProduct);

// Ruta para eliminar productos
router.post('/products', productController.deleteProduct);

// Ruta para listar todos los usuarios
router.get('/products', userController.getUsers);

module.exports = router;