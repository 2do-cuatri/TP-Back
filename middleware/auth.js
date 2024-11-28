const { verificarToken } = require('../lib/auth/jwt');
const User = require('../models/user');

// Revisa si las rutas tienen un id de usuario, lo busca y agrega su info al request
// Si en cualquier controlador hacemos req.user tendremos la data del usuario.
const checkUser = async (req, res, next) => {
    // Verificar el token y extraer la data
    const token = req.cookies.JWT_TOKEN;
    const decoded = verificarToken(token);
    if (!token || !decoded) {
        req.user = null;
        return next();
    };

    // Buscar el usuario y agregar al objeto del request si existe.s
    try {
        const user = await User.findById(decoded._id);
        if (!user) throw new Error("Usuario no encontrado")
        req.user = decoded || null;
        next();
    } catch(err) {
        console.error("Something failed on authentication", err)
        next();
    }
}

module.exports = { checkUser }