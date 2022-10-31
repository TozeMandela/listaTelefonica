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
Router.post('/contacto/register',  userRequired, contactos.register);
Router.get('/contacto/edit/:_id',  userRequired, contactos.edit);
Router.post('/contacto/edit',  userRequired, contactos.registerEdit);
Router.get('/contacto/excluir/:_id',  userRequired, contactos.remove)

module.exports = Router;
