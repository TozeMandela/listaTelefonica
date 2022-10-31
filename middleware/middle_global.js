exports.Global=(req, res, next)=>{
    res.locals.erros = req.flash('Erros')
    res.locals.success = req.flash('sucesso')
    res.locals.user = req.session.user;
    next()
}

exports.userRequired = (req, res, next)=>{
    if(!req.session.user){
        req.flash('Erros', 'você precisa fazer login')
        req.session.save(()=>{
            res.redirect('/');
        });
        return;
    } 
    next();
} 