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

async function atualizarFuncionario(idProfissional, dados){
    let campos = [];
    let valores = [];

    for(let campo in dados){
      if (dados[campo] !== undefined && dados[campo] !== null){
        campos.push(`${campo} = ?`);
        valores.push(dados[campo]);
      }
    }

    if (campos.length === 0) return false;
    valores.push(idProfissional);

    const query = `
    UPDATE funcionarios
    SET ${campos.join(', ')}
    WHERE id_profissional = ?
    `;

    const [result] = await pool.query(query, valores);
    return result.affectedRows > 0;
}

async function buscarFuncionarioPorId(id_profissional) {
  const [rows] = await pool.query('SELECT * FROM funcionarios WHERE id_profissional = ?', [id_profissional]);
  return rows[0];
}

async function atualizarSenhaFuncionario(id_profissional, novaSenhaHash) {
  const [result] = await pool.query(
    'UPDATE funcionarios SET senha = ? WHERE id_profissional = ?',
    [novaSenhaHash, id_profissional]
  );
  return result.affectedRows > 0;
}

module.exports = { 
  encontrarPorEmail, 
  cadastrarFuncionario, 
  atualizarFuncionario, 
  buscarFuncionarioPorId, 
  atualizarSenhaFuncionario
};
