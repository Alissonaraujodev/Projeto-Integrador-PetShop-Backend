const { pool } = require('../config/db');

async function cadastrarServico(nome_servico, valor, categoria) {
  await pool.query(
    'INSERT INTO servicos (nome_servico, valor, categoria) VALUES (?, ?, ?)',
     [nome_servico, valor, categoria]
  );
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



module.exports = { cadastrarServico, listarServicos};