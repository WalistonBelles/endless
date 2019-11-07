/* Cria a tabela usuario*/
CREATE TABLE usuario(
	 nome_cli VARCHAR(100) NOT NULL,
	 email_cli VARCHAR(100) PRIMARY KEY NOT NULL,
	 senha_cli VARCHAR(100) NOT NULL
 );

/* Cria a tabela servicos*/
CREATE TABLE servicos(
 	id serial PRIMARY KEY,
 	nome VARCHAR(100) NOT NULL,
  	tema VARCHAR(100) NOT NULL,
	duracao VARCHAR(20) NOT NULL,
	preco VARCHAR(20) NOT NULL,
  	foto VARCHAR(100) NOT NULL
);


/* Deleta a tabela usuario caso precise */
 DROP TABLE usuario;

/* Insere dados na tabela usuario */
INSERT INTO usuario(email_cli, senha_cli) VALUES(
	'waliston@gmaial.com',
	'waliston123'
);

/* Seleciona todos os dados da tabela usuario */
 SELECT * FROM usuario;

 