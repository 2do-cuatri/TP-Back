const User = require('../models/user'); 

// GET muestra la vista login
const getLogin = (req, res) => {
    if (req.user) {
        res.redirect(`/?userId=${req.user._id}`)
    } else {
        res.render('login');
    }
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
                 res.redirect(`/?userId=${user._id}`)
            }
        } else {
            const newUser = new User({
                ...req.body,
                rol: "cliente"
            })
            await newUser.save()
            res.redirect(`/?userId=${newUser._id}`)
        }
    } catch(err) {
        res.status(500, err.message)
    }
};

module.exports = {getLogin, postLogin};