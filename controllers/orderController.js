const Order = require('../models/order');
const Cart = require('../models/cart');

const getOrders = async (req, res) => {
    // Traer todas las orders del user (todas si es admin)
    throw new Error("No implementado")
}

const getOrderById = async (req, res) => {
    // Traer la orden si esta autorizado a verla
    throw new Error("No implementado")
}

const placeOrder = async (req, res) => {
    const {
        cartId,
        tipoPago
    } = req.body;
    try {
        // Validar que existe y se tiene autorizacion
        const carrito = await Cart.findById(cartId);
        if (!carrito) return res.status(404).send("Carrito no encontrado");
        if (!req.user._id || !carrito.userId.equals(req.user._id)) return res.status(401).send('Parece que este no es tu carrito!');
        
        // Crear nueva orden
        const orden = new Order({
            cartId,
            date: new Date().toISOString(),
            payment: tipoPago === 'transferencia' ? 0 : carrito.products.reduce((acc, curr) => acc+=curr.quantity*curr.product.price, 0),
            status: 'procesando'
        })
        await orden.save();

        // Setear el carrito como inactivo
        await Cart.findByIdAndUpdate(carrito._id, {
            active: false
        })

        res.redirect('/?userId='+req.user._id);
    } catch(err) {
        res.status(500).send(err.message)
    }
}

const editOrder = async (req, res) => {
    // (Admin) editar el estado de la orden. Algo mas?
    throw new Error("No implementado")
}


module.exports = {
    getOrders,
    getOrderById,
    placeOrder,
    editOrder
}