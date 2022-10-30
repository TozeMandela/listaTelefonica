exports.errToken = (err, req, res, next)=>{
    if(err){
        console.log(err)
        return res.render('pages/404');
    }
}
exports.Token = (req, res, next)=>{
    res.locals.csrf = req.csrfToken();
    next()
}

