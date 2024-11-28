const jwt = require('jsonwebtoken');
require('dotenv').config();
/**
 * Devuelve el usuario tokenizado para guardar en la cookie.
 * @param {User} user La data del usuario como viene de la BBDD.
 * @returns El token o null si no se le paso data.
 */
function tokenizar(user) {
    if (!user) return null;
    const { pass, ...tokenizable } = user;
    const token = jwt.sign(tokenizable, process.env.JWT_SECRET);
    return token;
}

/**
 * Verifica que un token sea valido
 * @param {unknown} token
 * @returns {unknown} La data del token si es valido. Null si no es valido o no se le paso un token.
 */
function verificarToken(token) {
    if(!token) return null
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch(err) {
        console.error("Error al verificar JWT: ", err.message)
        return null
    }
}

module.exports = {
    tokenizar,
    verificarToken
}