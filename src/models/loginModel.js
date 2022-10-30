const mongoose = require('mongoose');
const validator = require('validator');
const bcryptJs = require('bcryptjs');

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    tel:{
        type: Number,
        require: true
    },
    email:{
        type: String,
        require: false
    },
    password:{
        type: String,
        require: true
    }
});
const registerModel = mongoose.model('register', registerSchema);

class Register{

    constructor (body){
        this.body = body,
        this.Erros = [],
        this.user = null
    }

    async login (){
        this.valida(false);
        if(this.Erros.length > 0) return; 

        this.user = await registerModel.findOne({email: this.body.email});
        if(!this.user){ 
            this.Erros.push('e-mail or password invalid!')
            return;
        }
        if(!bcryptJs.compareSync(this.body.password, this.user.password)){
            this.Erros.push('senha errada!')
            this.user = null;
            return;
        }
    }

    async register(){
        this.valida(true);
        if(this.Erros.length > 0) return;

        await this.UserExist();
        if(this.Erros.length > 0) return;
        
        this.Bcryptografando();
        try{
            await registerModel.create(this.body);
        }catch(e){
            this.Erros.push('erro ao cadastrar na base de dados');
            console.log('erro ao cadastrar na base de dados')
            return;
        }
    }

    valida(isRegister = false){
        if(isRegister){
            this.cleanUp();
        } 
        
        if(!validator.isEmail(this.body.email)) this.Erros.push('não é um email Valido');
        
        if(this.body.password.length < 6 && this.body.password.length >20) this.Erros.push('a palavra passe ñ deve ser menor que (6) digitos nem maior que 20');
        
        if(isRegister){
            if(this.body.tel.length < 9) this.Erros.push('campo Nº telefone é requerido e o numero telefonico tem de ter 9 ou mais digitos');
        }
    }

    Bcryptografando(){
        const salt = bcryptJs.genSaltSync();
        this.body.password = bcryptJs.hashSync(this.body.password, salt);
    }
    
   async UserExist(){
        const user = await registerModel.findOne({email: this.body.email});
        if(user) this.Erros.push('usuario já existe!')
    }
    cleanUp(){
        /* previnindo que no dados enviados pelo form só venha string */
        for(const key in this.body){
            if(typeof this.body[key] !=='string'){
                this.body[key] = '';
            }
        }
        
        this.body = {
            name: this.body.name,
            tel: this.body.tel,
            email: this.body.email,
            password: this.body.password
        }
    }
}


module.exports = Register;