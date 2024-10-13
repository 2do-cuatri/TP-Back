const User = require('../models/user');

// Revisa si las rutas tienen un id de usuario, lo busca y agrega su info al request
// Si en cualquier controlador hacemos req.user tendremos la data del usuario.
const checkUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.query.userId);
        req.user = user || null;
        next();
    } catch(err) {
        console.error("Something failed on authentication")
        next();
    } 
}

module.exports = { checkUser }