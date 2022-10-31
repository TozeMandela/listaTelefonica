const  mongoose = require("mongoose");
const validator = require('validator');

const contactosSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    tel: {
        type: String,
        require: true
    },
    email: {
        type: String,
        reuire: false
    }
});

const contactoModel = mongoose.model('Contactos', contactosSchema);

function Contactos(body){
    this.contacto = null;
    this.body = body;
    this.Erros = new Array();

}

Contactos.prototype.Get = async function (){
    try{
        this.contacto = await contactoModel.find();
    }catch(e){
        console.log('erro ao buscar no base dados...', e)
    }
    
}
Contactos.edit = async function (id){
    try{
        const contactEdit = await contactoModel.findById(id);
        return contactEdit;
    }catch(e){
        console.log('erro ao pesquisar', e);
    }
}
Contactos.Remove = async function (id){
    try{ 
        await contactoModel.findOneAndRemove(id);
    }catch(e){
        console.log('erro ao pesquisar', e);
    }
}

Contactos.prototype.registerEdiit = async function(id){
    this.valida();
    
    if(this.Erros.length > 0) return;
    try{
        await contactoModel.findByIdAndUpdate(id, this.body, {new: true});
    }catch(e){
        console.log('erro ao salvar edição')
    }
}
Contactos.prototype.register = async function(){
    this.valida();
    if(this.Erros.length > 0) return;
    
    try{
        await contactoModel.create(this.body);
    }catch(e){
        console.log('erro ao salvar o contacto...', e)
    }

}

Contactos.prototype.valida = function(){
       
    this.cleanUp();
    
    console.log('bbbbbbb', this.body)
    if(this.body.name == '') this.Erros.push('campo nome é requerido');
    if(this.body.email && !validator.isEmail(this.body.email)) this.Erros.push('email invalido');
    if(this.body.tel.length <= 8) this.Erros.push('contactos deve ter no minimo 9 digitos')
}

Contactos.prototype.cleanUp = function(){
    for(const key in this.body){
        if(typeof this.body[key] !== 'string') this.body[key] = '';
    }

    this.body = {
        name: this.body.name,
        tel: this.body.tel,
        email: this.body.email
    }
}

module.exports = Contactos;