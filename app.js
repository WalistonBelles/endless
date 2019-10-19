var createError = require('http-errors');
var express = require('express');
var consign = require('consign');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var session = require('express-session');

// instancia um servidor
var app = express();

// instancia as sessões (secret é do express)
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

// informa o diretório de views padrão (considera o path a partir de app.js)
app.set('views', path.join(__dirname, 'views'));
// engine de views EJS (escreve html dinâmico com javascript)
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
// body parser (midleware: requisição/resposta).. extended = formato json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// middleware de validação
app.use(expressValidator());

// inclui o diretório routes no consign (autoload da aplicação)
consign()
  .include('routes')
  .into(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
