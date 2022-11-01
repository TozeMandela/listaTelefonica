const validator = require('validator');

 class ValidatorOne {
    constructor(form){
        this.form = document.querySelector(form);
        this.Erros = [];
    }

    initForm(){
        this.form.addEventListener('submit', evt=>{
            evt.preventDefault();

            this.validInput(evt);
            
            if(this.Erros.length > 0){
                console.log(this.Erros)
                this.Erros.forEach(err => {
                    alert(err);
                    window.location.reload()
                });
            }
            evt.target.submit()
        console.log('mandela...')
        })
    }
    validInput(evtForm){
        evtForm.target.querySelectorAll('input').forEach(form=>{
            if(form.name !== '_csrf'){
                if(form.name == 'email'){
                    if(!form.value && !validator.isEmail(form.value)) this.Erros.push('campo E-mail é requerido e o email têm que ser valido!');
                }

                if(form.name == 'password'){
                    if(!form.value || form.value.length < 6) this.Erros.push('campo senha é requerido e a senha deve ter mais de 6 digitos!');
                }
            } 
        })
    }
}

module.exports = ValidatorOne;

 