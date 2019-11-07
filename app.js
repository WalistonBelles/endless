var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var session = require('express-session');

//inclui as rotas
var routes = require('./routes');
var admin = require('./routes/admin'); 

// instancia um servidor
var app = express();

// instancia as sessões (secret é do express)
app.use(session({secret: 'alguma senha',saveUninitialized: true,resave: true}));

// informa o diretório de views padrão (considera o path a partir de app.js)
app.set('views', path.join(__dirname, 'views'));
// engine de views EJS (escreve html dinâmico com javascript)
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
// extended = formato json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// middleware de validação
app.use(expressValidator());

// SITE
app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/cadastro', routes.cadastro);
app.get('/servicos', routes.servicos);
app.get('/sobre', routes.sobre);
app.get('/contatos', routes.contatos);
app.post('/entrar', routes.entrar);
app.post('/salvar', routes.salvar);

// ADMIN
app.get('/admin/index', admin.index);
app.get('/admin/servicos', admin.servicos);
app.get('/admin/servicos/adicionar', admin.adicionar);
app.post('/admin/servicos/salvar', admin.salvar);
app.get('/admin/servicos/excluir/:idservicos', admin.excluir);

// iniciar um servidor com uma porta específica
app.listen(3000, function () {
  console.log('Servidor executando na porta 3000..');
});

