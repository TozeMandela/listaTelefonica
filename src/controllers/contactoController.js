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
        res.redirect('back')
    }catch(e){
        res.render('pages/404');
        console.log('erro no controller Contacto method Post', e);
    }
    
}