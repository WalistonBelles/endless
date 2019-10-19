// ROTAS EM EXPRESS E RENDERIZAÇÃO COM O EJS

// recebe de app.js
module.exports = function(app) {
    // callback: req, res
    app.get('/logout', function(req, res) {
        req.session.destroy((err) => {
            if(err) {
                return console.log(err);
            }
            res.redirect('/login');
        });
    
    });
  };