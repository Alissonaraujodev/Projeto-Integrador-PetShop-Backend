const { pool } = require('../config/db');

async function encontrarPorNome(nome_servico) {
  const [rows] = await pool.query('SELECT * FROM servicos WHERE nome_servico = ?', [nome_servico]);
  return rows[0];
}

async function cadastrarServico(nome_servico, valor, categoria) {
  await pool.query(
    'INSERT INTO servicos (nome_servico, valor, categoria) VALUES (?, ?, ?)',
     [nome_servico, valor, categoria]
  );
}

module.exports = { cadastrarServico, encontrarPorNome };