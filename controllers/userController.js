const { encriptarContrasena, compararHash } = require('../lib/auth/encriptacion');
const { agregarCookieJwt, limpiarCookieJwt } = require("../lib/auth/cookie");
const { tokenizar } = require('../lib/auth/jwt');
const User = require('../models/user'); 

// GET muestra la vista login
const getLogin = (req, res) => {
    res.render('login');
};

//POST 
const postLogin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }).lean()
        if (user) {
            const valid = await compararHash(req.body.pass, user.pass)
            if (!valid) {
                return res.render('login', {
                    message: 'Contraseña incorrecta. Intenta nuevamente!'
                }) 
            }
            else {
                const token = tokenizar(user)
                if (token) {
                    agregarCookieJwt(res, token)
                } 
                if (user.rol == "administrador") {
                    return res.redirect('/admin')
                }
                res.redirect("/")
            }
        } else {
            // Registrar como admin los dominios @admin.com
            const rol = req.body.email.endsWith("@admin.com") ? "administrador" : "cliente"
            const hashedPass = await encriptarContrasena(req.body.pass)
            const newUser = new User({
                email: req.body.email,
                pass: hashedPass,
                rol
            })
            await newUser.save()
            const token = tokenizar({
                _id: newUser._id,
                email: newUser.email,
                rol: newUser.rol
            })
            if (token) {
                agregarCookieJwt(res, token)
            }

            if (rol === "administrador") {
                return res.redirect("/admin")
            }
            res.redirect("/")
        }
    } catch(err) {
        res.status(500).send(err.message)
    }
};

const postLogout = async(req, res) => {
    limpiarCookieJwt(res);
    res.redirect("/")
}

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).jsonp(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// GET muestra la vista chat
const getChat = (req, res) => {
    res.render('chat');
};

module.exports = {getLogin, postLogin, getUsers, postLogout, getChat};