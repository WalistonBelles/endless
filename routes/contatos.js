
// ROTAS EM EXPRESS E RENDERIZAÇÃO COM O EJS

// recebe de app.js
module.exports = function(app) {
  // callback: req, res
  app.get('/contatos', function(req, res) {
    res.render('contatos');
  });
};