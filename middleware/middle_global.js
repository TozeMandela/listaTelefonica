exports.Global=(req, res, next)=>{
    res.locals.erros = req.flash('Erros')
    res.locals.success = req.flash('sucesso')
    next()
}