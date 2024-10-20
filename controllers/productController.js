const { Product } = require('../models/product'); 

// Listar todos los productos
const getProducts = async (req, res) => {
    const filters = req.query;
    try {
        const products = await Product.find(filters);
        res.status(200).jsonp(products);
    } catch(err) {
        res.send(500, err.message)
    }
};

// Ver un producto por ID
const getProductById = async (req, res) => {
    const id = req.params.id
    try {
        const product = await Product.findById(id)
        res.status(200).jsonp(product)
    } catch(err) {
        res.status(500).send(err.message)
    }
};

// Agregar un producto
const postProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.redirect(`/admin?userId=${req.user._id}`)
        // res.status(201).jsonp(product)
    } catch(err) {
        res.status(500).send(err.message)
    }
}

// Eliminar un producto por ID
const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).send("Product deleted successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports ={getProducts, getProductById, postProduct, deleteProduct};