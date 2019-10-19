// recebe de app.js
module.exports = function(app) {
    // callback: req, res
    app.get('/admin', function(req, res) {
        sess = req.session;
        if(sess.email) {
            res.render('admin');
        }
        else {
            res.redirect('/login');
        }
    });
  };