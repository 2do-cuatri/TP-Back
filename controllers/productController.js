const Product = require('../models/product'); 

// Listar todos los productos
const getProducts = async (req, res) => {
    const filters = req.query;
    try {
        const products = await Product.find(filters);
        res.status(200).jsonp(products);
    } catch(err) {
        res.status(500, err.message)
    }
};

// Ver un producto por ID
const getProductById = async (req, res) => {
    const id = req.params.id
    try {
        const product = await Product.findById(id)
        res.status(200).jsonp(product)
    } catch(err) {
        res.status(500, err.message)
    }
};

// Agregar un producto
const postProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).jsonp(product)
    } catch(err) {
        res.status(500, err.message)
    }
}

module.exports ={getProducts, getProductById, postProduct};