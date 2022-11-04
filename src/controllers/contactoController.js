const Contactos = require('../models/contactoModel');

exports.cadastrarC = (req, res)=>{
    res.render('pages/cadastrarContactos');
}

exports.register = async (req, res)=>{
   try{
        const contacto = new Contactos(req.body);
        await contacto.register()
        
        if(contacto.Erros.length > 0){
            req.flash('Erros', contacto.Erros);
            req.session.save(()=>{
                res.redirect('/cadastrarC/index');
            });
            return;
        }
        req.flash('sucesso', 'Contacto salvo com sucesso');
        res.redirect('back');
    }catch(e){
        res.render('pages/404');
        console.log('erro no controller Contacto method Post', e);
    }
    
}
/* 
exports.delite = (req, res)=>{
    console.log(req.params)
}
 */
exports.edit = async (req, res)=>{
    try{
        const contact = await Contactos.edit(req.params);
        res.render('pages/editarContactos', {contacto: contact})
    }catch(e){
        console.log('erroooooo');
        res.render('pages/404')
    }
}
exports.registerEdit = async (req, res)=>{
    const contato = new Contactos(req.body);
    try{
        await contato.registerEdiit(req.body._id);
        if(contato.Erros.length > 0){
            req.flash('Erros', contato.Erros);
            req.session.save(()=>{
                res.redirect(`/contacto/edit/${req.body._id}`);
            });
            return;
        }
        req.flash('sucesso', 'Contacto editado com sucesso');
        res.redirect('back');

    }catch(e){
        console.log('erro no method post do register edit');
        res.render('pages/404')
    }
}
exports.remove = async (req, res)=>{
    try{
        await Contactos.Remove(req.params);
        req.flash('sucesso', 'eliminado com sucesso');
        res.redirect('back');
    }catch(e){
        console.log('erroooooo',e);
        res.render('pages/404')
    }
}