const { async } = require('regenerator-runtime');
const Register = require('../models/loginModel');

exports.index = (req, res)=>{
    res.render('pages/login', {csrf: res.locals.csrf});
}

exports.logar = async (req, res)=>{
    
    try {
        const login = new Register(req.body);
        await login.login();
        if(login.Erros.length>0){
            req.flash('Erros', login.Erros);
            req.session.save(()=>{
                return res.redirect('/login/index');
            });
            return;
        }

        req.flash('sucesso', 'login feito com sucesso!');
        req.session.user = (login.user);
        res.redirect('back');

    } catch (error) {
        console.log('erro ao logar',error)
    }
}

exports.logout = (req, res)=>{
    req.session.destroy();
    res.redirect('/');
}

exports.register = async (req, res)=>{
    try{
        const register = new Register(req.body);
        await register.register();
        
        if(register.Erros.length>0){
            req.flash('Erros', register.Erros);
            req.session.save(()=>{
            return res.redirect('/login/index');
            });
            return;
        }
        
        req.flash('sucesso', 'cadastrado com sucesso!');
        req.session.save(()=>{
            return res.redirect('back');
        })
    }catch(e){
        console.log(e);
        return res.render('404')
    }
}