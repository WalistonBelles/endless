const formidable = require('formidable');
// conexão com o postgres
const { Client } = require('pg');
//Cria a string de conexão com o PostgreSQL.
var connectionString = 'postgress://postgres@localhost/Endless';
//Abre a conexão com o banco de dados.
const client = new Client({ connectionString: connectionString }); 
client.connect();
var user1 = '';
// rota index 
exports.index = function (req, res) {
    client.query('SELECT * FROM servicos', function (err, result) {
          if (err) {
              console.log(err);
              res.status(400).send(err);
          }
          res.render('admin/index', { servicos: result.rowCount });
      });
};

// rota serviços
exports.servicos = function(req, res) {
    client.query('SELECT * FROM servicos', function (err, result) {
	      if (err) {
	          console.log(err);
	          res.status(400).send(err);
	      }
	      res.render('admin/servicos', { servicos: result.rows });
	  });
 };

// rota adicionar curso
exports.adicionar = function (req, res) {
    client.query('SELECT * FROM servicos', function (err, result) {
          if (err) {
              console.log(err);
              res.status(400).send(err);
          }
          res.render('admin/servicos/adicionar', { servicos: result.rowCount });
      });
};

// rota salvar curso
exports.salvar = function (req, res) {
    // upload da foto
    var form = new formidable.IncomingForm();    
    form.parse(req); 
    // altera o diretório padrão de upload (tmp)
    form.on('fileBegin', function (name, file){
        file.path = 'public/images/' + file.name;
    });
    // campos do formulário
    var form2 = new formidable.IncomingForm();
    form2.parse(req, function (err, fields, files) {
        var nome = fields.nome;
        var tema = fields.tema;
        var duracao = fields.duracao;
        var preco = fields.preco;
        var foto = files.foto.name;
        // console.log(files.foto);   
        client.query("INSERT INTO servicos (nome, tema, duracao, preco, foto) VALUES($1, $2, $3, $4, $5) RETURNING *", [nome, tema, duracao, preco, foto], function (err, result) {
            if (err) {
                console.log("Erro: %s ", err);
            }            
        });    
    
    });
    res.redirect('../servicos');
};

// rota excluir curso
exports.excluir = function (req, res) {
    var idservicos = req.params.idservicos;
    console.log(idservicos);
    client.query("DELETE FROM servicos WHERE id=$1", [idservicos], function (err, rows) {
        if (err) {
            console.log("Erro: %s ", err);
        }
        res.redirect('../../servicos');
    });
};

// rota editar notícia
exports.editar = function (req, res) {
    var idservicos = req.params.idservicos;

    client.query("SELECT * FROM servicos WHERE id=$1", [idservicos], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.render('admin/servicos/editar', { servicos: result.rows });
    });
};