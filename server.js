/* configurando variaveis de ambiente para gerenciar senhas e outras coisas que possam ser pessoal */
require('dotenv').config();
/* modulo para lidar com caminhos */
const path = require('path');
/* configurando o express */
const express = require('express');
const app = express();

/* connectando ao mongo */
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTBD).then(()=>{
    app.emit('Connected');
    console.log('connetion with data-bases is sucessfull.');
}).catch(e=>console.log('erro ao connectar com a base de dados'));


/* cookies e flash message */
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

/* lidando com a segurança dos formularios */
const helmet = require('helmet');
const csrf = require('csurf');
const {Token, errToken} = require('./middleware/middle_csrf');
const {Global} = require('./middleware/middle_global');

/* chamando minhas routas */
const router = require('./router');

app.use(helmet());

const sessionConfig = session({
    secret: 'asdfghjklçpoiuytrewqzxcvbnm',
    store: MongoStore.create({mongoUrl: process.env.CONNECTBD}),
    resave: false,
    saveUninitialized: false,
    cookie: { 
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true
      }
  });

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());

app.use(sessionConfig);
app.use(flash());
app.use(csrf());

app.use(Token);
app.use(errToken);
app.use(Global);
console.log('aquiiiiii')
app.use('/', router);

app.on('Connected', ()=>{
    app.listen(3020, ()=>{
        console.log('servidor telefonico rodando...');
    })
})

