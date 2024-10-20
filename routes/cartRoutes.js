const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Obtener el carrito activo para el usuario (o uno nuevo)
router.get('/', cartController.getCart);

// Obtener un carrito especifico
router.get('/:id', cartController.getCartById);

// Agregar un producto al carrito
router.post('/:id/:productId', cartController.addProductToCart)

// Quitar un producto del carrito (1 unidad a la vez)
router.delete('/:id/:productId', cartController.removeProductFromCart)

module.exports = router;