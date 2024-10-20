const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Ruta para listar productos (acepta search params como filtros)
router.get('/', productController.getProducts);

// Ruta para crear un producto
router.post('/', productController.postProduct);

// Ruta para ver un producto por ID
router.get('/:id', productController.getProductById);

// Ruta para eliminar un producto por ID
router.delete('/:id', productController.deleteProduct);

module.exports = router;