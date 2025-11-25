const mysql = require('mysql2/promise');
const fs = require('fs');

const env = process.env.NODE_ENV || 'development';
let dbConfig;
 
if (env === 'production') {
  dbConfig ={
    host: process.env.DB_HOST_PROD,
    user: process.env.DB_USER_PROD,
    password: process.env.DB_PASSWORD_PROD,
    port: parseInt(process.env.DB_PORT_PROD),
    database: process.env.DB_NAME_PROD,
    ssl: {
      ca: fs.readFileSync(path.join(__dirname, 'src/config/ca.pem')),
    }
  };
}else{
  dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };
}


const pool = mysql.createPool(dbConfig);

pool.getConnection()
  .then(connection => {
    console.log('Conectado ao banco de dados MySQL!');
    connection.release();
  })
  .catch(err => {
    console.error('Erro inesperado na conexão com o banco de dados MySQL:', err);
    process.exit(-1);
  });

module.exports = {pool, dbConfig};