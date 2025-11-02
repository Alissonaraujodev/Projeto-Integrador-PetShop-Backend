const { pool } = require('../config/db');

async function cadastrarServico(nome_servico, valor, categoria) {
  await pool.query(
    'INSERT INTO servicos (nome_servico, valor, categoria) VALUES (?, ?, ?)',
     [nome_servico, valor, categoria]
  );
}

async function encontrarPorNome(nome_servico) {
  const query = `
    SELECT * FROM servicos
    WHERE nome_servico = ?
    LIMIT 1
  `;

  const [rows] = await pool.query(query, [nome_servico]);
  return rows.length > 0 ? rows[0] : null;
}

async function listarServicos(nome_servico, categoria){
  let query = `
    SELECT 
      s.*
    FROM servicos s
    WHERE 1=1   
  `;

  const params = [];

    if(nome_servico){
      query += ' AND s.nome_servico LIKE ?';
      params.push(`%${nome_servico}%`);
    }

    if(categoria){
      query += ' AND s.categoria LIKE ?';
      params.push(`%${categoria}%`);
    }

    const [rows] = await pool.query(query, params);
    return rows;
}

async function atualizarServico(idServico, dados) {
  let campos = [];
  let valores = [];

  for(let campo in dados){
    if (dados[campo] !== undefined && dados[campo] !== null){
      campos.push(`${campo} = ?`);
      valores.push(dados[campo]);
    }
  }

  if (campos.length === 0) return false;
  valores.push(idServico);

  const query = `
    UPDATE servicos
    SET ${campos.join(', ')}
    WHERE id_servico = ?
  `;

  const [result] = await pool.query(query, valores);
  return result.affectedRows > 0;
}



module.exports = { 
  cadastrarServico,
  encontrarPorNome,
  listarServicos,
  atualizarServico
};