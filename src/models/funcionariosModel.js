const { pool } = require('../config/database');

async function encontrarPorEmail(email) {
  const [rows] = await pool.query('SELECT * FROM funcionario WHERE email = ?', [email]);
  return rows[0];
}

async function cadastrarFuncionario(nome, email, senhaCriptografada, cargo, crmv) {
  await pool.query(
    'INSERT INTO funcionario (nome, email, senha, cargo, crmv) VALUES (?, ?, ?, ?, ?)',
    [nome, email, senhaCriptografada, cargo, crmv]
  );
}

module.exports = { encontrarPorEmail, cadastrarFuncionario };
