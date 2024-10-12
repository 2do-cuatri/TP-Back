const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//Falta crear las funciones en el archivo userController
// Ruta de login
router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);

module.exports = router;