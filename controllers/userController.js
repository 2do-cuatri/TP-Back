const User = require('../models/user'); 

// GET muestra la vista login
const getLogin = (req, res) => {
    res.render('login');
};

//POST 
const postLogin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            if (user.pass !== req.body.pass) {
                res.render('login', {
                    message: 'Contraseña incorrecta. Intenta nuevamente!'
                }) 
            }
            else {
                if (user.rol == "administrador") {
                    return res.redirect(`/admin?userId=${user._id}`)
                }
                res.redirect(`/?userId=${user._id}`)
            }
        } else {
            // Registrar como admin los dominios @admin.com
            const rol = req.body.email.endsWith("@admin.com") ? "administrador" : "cliente"
            const newUser = new User({
                ...req.body,
                rol
            })
            await newUser.save()
            if (rol === "administrador") {
                return res.redirect(`/admin?userId=${newUser._id}`)
            }
            res.redirect(`/?userId=${newUser._id}`)
        }
    } catch(err) {
        res.status(500).send(err.message)
    }
};

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

module.exports = {getLogin, postLogin, getUsers, getChat};