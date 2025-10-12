const { pool } = require('../config/db');

async function encontrarPorEmail(email) {
  const [rows] = await pool.query('SELECT * FROM clientes WHERE email = ?', [email]);
  return rows[0];
}

async function cadastrarCliente(cpf, nome, email, senhaCriptografada, telefone, logradouro, numero, complemento, bairro, cidade, estado, cep) {
  await pool.query(
    'INSERT INTO clientes (cpf, nome, email, senha, telefone, logradouro, numero, complemento, bairro, cidade, estado, cep) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
     [cpf, nome, email, senhaCriptografada, telefone, logradouro, numero, complemento, bairro, cidade, estado, cep]
  );
}


module.exports = { encontrarPorEmail, cadastrarCliente };
