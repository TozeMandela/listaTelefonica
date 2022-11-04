import 'core-js/stable';
import 'regenerator-runtime/runtime';
import ValidatorOne from '../class/validator/f1';

const validatorLogin = new ValidatorOne('.login');
const validatorCriarConta = new ValidatorOne('.createAccount');
const validatorCadastroContact = new ValidatorOne('.cadastroContacto');

validatorLogin.initForm( true);
validatorCriarConta.initForm();
validatorCadastroContact.initForm();