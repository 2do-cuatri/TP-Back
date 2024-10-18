const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController')

// Obtener orders
router.get('/', orderController.getOrders);

// Obtener una orden especifica
router.get('/:id', orderController.getOrderById);

// Agregar una orden
router.post('/', orderController.placeOrder);

//Modificar el estado de una orden
router.put('/:id', orderController.editOrder);

module.exports = router;