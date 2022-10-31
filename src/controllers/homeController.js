const Contactos = require('../models/contactoModel');

exports.index = async (req, res)=>{
    const contacto = new Contactos()
    await contacto.Get();
    
    if(!contacto.contacto) contacto.contacto = undefined;
    
    res.render('home', {contacts : contacto.contacto});
};