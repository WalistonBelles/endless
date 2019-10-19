// ROTAS EM EXPRESS E RENDERIZAÇÃO COM O EJS

// recebe de app.js
module.exports = function(app) {
  // callback: req, res
  app.get('/', function(req, res) {
    res.render('test');
  });
};