// recebe de app.js
module.exports = function(app) {
  // rota get de acesso
  app.get('/login', function(req, res) {
    res.render('login', { validacao: {}, acesso: {} });
  });

  // rota post de acesso
  app.post('/login', function(req, res) {

    var acesso = req.body;

    //console.log(login);
    req.assert('email', 'O e-mail é obrigatório').notEmpty();
    req.assert('senha', 'A senha é obrigatória').notEmpty();
    req.assert('senha', 'A senha deve conter entre 6 e 10 caracteres').len(6, 100);
    var erros = req.validationErrors();

    if (erros) {
      res.render('login', { validacao: erros, acesso: acesso });
      return;
    }

    // verifica a senha de acesso
    if(req.body.senha == '123456') {
      // recebe o formulário da requisição
      sess = req.session;
      // atribui o "name" email do formulário à sessão
      sess.email = req.body.email;
      // redireciona para a área administrativa
      res.redirect('/admin');
    }

    // caso a senha esteja incorreta, envia para a tela de login novamente
    
    else{
      res.render('login', { validacao: {}});
      //console.log(erros);
    return;
    }
  });
};