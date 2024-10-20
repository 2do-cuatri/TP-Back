const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta de login
router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);
router.get('/user',userController.getUsers);

module.exports = router;