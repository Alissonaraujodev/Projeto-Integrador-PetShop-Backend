const mysql = require('mysql2/promise');

const env = 'development'; 
let dbConfig;

dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT), 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

pool.getConnection()
  .then(connection => {
    console.log('Conectado ao banco de dados MySQL local!');
    connection.release();
  })
  .catch(err => {
    console.error('Erro ao conectar com o banco de dados local:', err);
    process.exit(-1);
});

module.exports = {pool, dbConfig};