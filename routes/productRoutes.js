const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

//Falta agregar en controller las funciones
// Ruta para listar todos los productos
router.get('/', productController.getProducts);

// Ruta para filtrar productos por categoría
router.get('/category/:category', productController.getProductsByCategory);

// Ruta para ver un producto por ID
router.get('/:id', productController.getProductById);

module.exports = router;