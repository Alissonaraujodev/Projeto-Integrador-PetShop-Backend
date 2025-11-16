const { pool } = require('../config/db');

async function servicoProfissional( id_profissional, id_servico, ){
    await pool.query(
        'INSERT INTO profissional_servico (id_profissional, id_servico ) VALUES (?, ?)',
        [id_profissional, id_servico ]
    );
}

async function listarProfissionaisDisponiveisPorServico(id_servico, data_hora) {
  const [rows] = await pool.query(`
    SELECT f.id_profissional, f.nome
    FROM funcionarios f
    INNER JOIN profissional_servico ps ON ps.id_profissional = f.id_profissional
    WHERE ps.id_servico = ?
      AND f.id_profissional NOT IN (
        SELECT a.id_profissional FROM agendamentos a WHERE a.data_hora = ?
      )
  `, [id_servico, data_hora]);

  return rows;
}


module.exports = { 
    servicoProfissional,
    listarProfissionaisDisponiveisPorServico
}