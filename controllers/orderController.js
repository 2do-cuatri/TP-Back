const Order = require('../models/order');
const Cart = require('../models/cart');

const getOrders = async (req, res) => {
    // Traer todas las orders del user (todas si es admin)
    try {
        // Trae todas las órdenes sin importar el usuario
        const orders = await Order.find(); 

        res.render('admin',{orders}); 
    } catch (err) {
        res.status(500).send("Error al obtener las órdenes");
    }
}

const getOrderById = async (req, res) => {
    try {
        // Obtener el ID de la orden 
        const orderId = req.params.id;

        // Buscar la orden por su ID en la base de datos
        const order = await Order.findById(orderId);

        // Si no se encuentra la orden, devolver un error 404
        if (!order) {
            return res.status(404).send("Orden no encontrada");
        }

        // Devolver la orden si se encuentra
        res.status(200).json(order);
    } catch (err) {
        // Si hay un error en el proceso, devolver un error 500
        res.status(500).send("Error al obtener la orden");
    }
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
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) return res.status(404).send('Orden no encontrada');
        res.status(200).json(order);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getOrders,
    getOrderById,
    placeOrder,
    editOrder
};