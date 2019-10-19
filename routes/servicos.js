
// ROTAS EM EXPRESS E RENDERIZAÇÃO COM O EJS

// recebe de app.js
module.exports = function(app) {

	var data;
    // callback: req, res
    app.get('/servicos', function(req, res) {

	  	const pg = require('pg');
		//Cria a string de conexão com o PostgreSQL.
		const connection = 'postgress://postgres@localhost/Endless';
		//Abre a conexão com o banco de dados.
		const client = new pg.Client(connection);
		client.connect();

		var result = client.query('SELECT * FROM servicos').then(res => {
	      data = res.rows;
	      console.log(data);
	    })
		.finally(() => {
	      client.end()
	    });

	    res.render('servicos', {servicos : data});
	  });
};