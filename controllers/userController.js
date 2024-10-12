var mongoose = require('mongoose');
const User = require('../models/user'); 

// GET muestra la vista login
const getLogin = (req, res) => {
    res.render('login');
};

//POST 
const postLogin = (req, res) => {
    res.send('Procesando login');//modificar
};

module.exports ={getLogin, postLogin};