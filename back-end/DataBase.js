require('dotenv').config();
const mysql = require('mysql2'); // Importa o módulo mysql2 para conectar ao MySQL

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Testar a ligação
connection.connect((err) => {
  if (err) {
    console.error('Erro na ligação à base de dados:', err);
  } else {
    console.log('Ligação à base de dados estabelecida com sucesso!');
  }
});

module.exports = connection; // Exporta a conexão para ser usada em outros arquivos
