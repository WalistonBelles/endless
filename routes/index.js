// conexão com o postgres
const { Client } = require('pg');
//Cria a string de conexão com o PostgreSQL.
var connectionString = 'postgress://postgres@localhost/Endless';
//Abre a conexão com o banco de dados.
const client = new Client({ connectionString: connectionString }); 
client.connect();

// rota index 
exports.index = function (req, res) {
	res.render('index');
};

// rota login
exports.login = function(req, res) {
    res.render('login', { validacao: {}, acesso: {} });
 };

// rota serviços
exports.servicos = function(req, res) {

    client.query('SELECT * FROM servicos', function (err, result) {
	      if (err) {
	          console.log(err);
	          res.status(400).send(err);
	      }
	      res.render('servicos', { servicos: result.rows });
	  });
 };

// rota sobre
exports.sobre = function (req, res) {
	res.render('sobre');
};

// rota sobre
exports.contatos = function (req, res) {
	res.render('contatos');
};

//rota admin
exports.admin = function (req, res) {
	res.render('admin');
};

// rota entrar
exports.entrar= function (req, res) { 
  var acesso = req.body; 
  // console.log(acesso);
  req.assert('email', 'O e-mail é obrigatório').notEmpty();
  req.assert('senha', 'A senha é obrigatória').notEmpty();
  req.assert('senha', 'O senha deve conter entre 5 e 10 caracteres').len(5, 10); 
  var erros = req.validationErrors();
  //console.log(erros);
  // se o formulário não foi validado, envia para a tela de login novamente
  if (erros) {
    res.render('login', { validacao: erros, acesso: acesso, sess: sess });
    return;
  }
  // verifica a senha de acesso
  if(req.body.senha == '12345') {
    // recebe o formulário da requisição
    sess = req.session;
    // atribui o name "email" do formulário à sessão
    sess.email = req.body.email;
    // redireciona para a rota da área administrativa
    res.redirect('/admin');
  }
  // caso a senha esteja incorreta, envia para a tela de login novamente
  else{
    // A FAZER: ENVIAR UMA MSG DE VALIDAÇÃO
    res.render('login', { validacao: {}, acesso: {}, sess: sess });
  return;
  }

};