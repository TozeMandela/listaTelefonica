const validator = require('validator');

 class ValidatorOne {
    constructor(form){
        this.form = document.querySelector(form);
        this.Erros = [];
    }

    initForm(EmailisCObrig = false){
        if(this.form){
            this.form.addEventListener('submit', evt=>{
                evt.preventDefault();

                this.validInput(evt,EmailisCObrig);
                
                if(this.Erros.length > 0){
                    console.log(this.Erros)
                    this.Erros.forEach(err => {
                        alert(err);
                        
                    });
                    return window.location.reload()
                }
                evt.target.submit()
            })
        }
    }
    validInput(evtForm, isCObrig = false){
        evtForm.target.querySelectorAll('input').forEach(form=>{
            if(form.name !== '_csrf'){
                if(form.name == 'email'){
                    if(!form.value && isCObrig && !validator.isEmail(form.value)) this.Erros.push('campo E-mail é requerido e o email têm que ser valido!');
                    if(!isCObrig && form.value && !validator.isEmail(form.value)) this.Erros.push('email invalido');
                }

                if(form.name == 'password'){
                    if(!form.value || form.value.length < 6) this.Erros.push('campo senha é requerido e a senha deve ter mais de 6 digitos!');
                }

                if(form.name == 'name'){
                    if(form.value == '')this.Erros.push('campo nome é requerido');
                } 
                if(form.name == 'tel') {
                    if(!form.value || form.value.length <= 8) this.Erros.push('contactos deve ter no minimo 9 digitos')
                }
            } 
        })
    }
}

module.exports = ValidatorOne;

 