const express = require('express');
const Router = express.Router();
const {index} = require('./src/controllers/homeController');
const login = require('./src/controllers/loginController');
const contactos = require('./src/controllers/contactoController');
const {userRequired} = require('./middleware/middle_global');

Router.get('/', index);

Router.get('/error', (req, res)=>{
    res.render('pages/404');
});

Router.get('/login/index', login.index);
Router.post('/login/entrar', login.logar);
Router.post('/login/register', login.register);
Router.get('/login/logout',login.logout);
Router.get('/cadastrarC/index', userRequired, contactos.cadastrarC);
Router.post('/contacto/register', contactos.register)


module.exports = Router;
