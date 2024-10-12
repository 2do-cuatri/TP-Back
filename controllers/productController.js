var mongoose = require('mongoose');
const Product = require('../models/product'); 

// Listar todos los productos
const getProducts = (req, res) => {
    res.send('Procesando ');//modificar
};

// Filtrar productos por categoría

const getProductsByCategory = (req, res) => {
    res.send('Procesando');//modificar
};

// Ver un producto por ID
const getProductById = (req, res) => {
    res.send('Procesando ');//modificar
};

module.exports ={getProducts, getProductsByCategory,getProductById};