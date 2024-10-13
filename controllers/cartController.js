const Cart = require('../models/cart');
const { Product } = require('../models/product');

const getCart = async (req, res) => {
    if (!req.user) 
        return res.status(500).send("Solo los usuarios autenticados tienen carritos");
    try {
        const existing = await Cart.findOne({
            userId: req.user._id,
            active: true
        })
        if (existing) return res.status(200).jsonp(existing)
        const newCart = new Cart({
            userId: req.user._id,
            active: true,
            products: []
        })
        await newCart.save();
        res.status(201).jsonp(newCart)
        
    } catch(err) {
        res.status(500).send(err.message)
    }
}

const getCartById = async (req, res) => {
    if (!req.user) 
        return res.status(500).send("Solo los usuarios autenticados tienen carritos");
    try {
        const cart = await Cart.findOne({
            userId: req.user._id,
            _id: req.params.id
        })
        res.status(200).jsonp(cart)
    } catch(err) {
        res.status(500).send(err.message)
    }
}

const addProductToCart = async (req, res) => {
    if (!req.user) 
        return res.status(500).send("Solo los usuarios autenticados tienen carritos");
    try {
        const cart = await Cart.findOne({
            _id: req.params.id,
            userId: req.user._id
        });
        if (!cart) return res.status(404).send("Carrito no encontrado")
        const matchIndex = cart.products.findIndex(p => p.product._id.equals(req.params.productId));
        if (matchIndex === -1) {
            const product = await Product.findById(req.params.productId);
            if (!product) return res.status(404).send("Producto no encontrado")
            cart.products.push({
                product,
                quantity: 1
            });
        } else {
            cart.products[matchIndex].$inc("quantity", 1);
        }
        await cart.save();
        res.status(200).jsonp(cart)
    } catch(err) {
        res.status(500).send(err.message)
    }
}

const removeProductFromCart = async (req, res) => {
    if (!req.user) 
        return res.status(500).send("Solo los usuarios autenticados tienen carritos");
    try {
        const cart = await Cart.findOne({
            _id: req.params.id,
            userId: req.user._id
        });
        if (!cart) return res.status(404).send("Carrito no encontrado")
        const matchIndex = cart.products.findIndex(p => p.product._id.equals(req.params.productId));
        if (matchIndex === -1) {
            return res.status(404).send("El producto no existe en el carrito")
        } else {
            if (cart.products[matchIndex].quantity <= 1) {
                cart.products.pull({ _id: cart.products[matchIndex]._id })
            } else {
                cart.products[matchIndex].$inc("quantity", -1);
            }
        }
        await cart.save();
        res.status(200).jsonp(cart)
    } catch(err) {
        res.status(500).send(err.message)
    }
}

module.exports = {
    getCart,
    getCartById,
    addProductToCart,
    removeProductFromCart
}