const { pool } = require('../config/db');

async function encontrarPorEmail(email) {
  const [rows] = await pool.query('SELECT * FROM funcionarios WHERE email = ?', [email]);
  return rows[0];
}

async function cadastrarFuncionario(nome, email, senhaCriptografada, cargo, crmv) {
  await pool.query(
    'INSERT INTO funcionarios (nome, email, senha, cargo, crmv) VALUES (?, ?, ?, ?, ?)',
    [nome, email, senhaCriptografada, cargo, crmv]
  );
}

module.exports = { encontrarPorEmail, cadastrarFuncionario };
