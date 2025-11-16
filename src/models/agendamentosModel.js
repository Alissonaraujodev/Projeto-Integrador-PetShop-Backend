const { pool } = require('../config/db');

async function criarAgendamento(id_pet, id_servico, id_profissional, data_hora, observacoes){
    await pool.query(
        'INSERT INTO agendamentos (id_pet, id_servico, id_profissional, data_hora, observacoes) VALUES (?, ?, ?, ?, ?)',
        [id_pet, id_servico, id_profissional, data_hora, observacoes]
    );
}

async function listarAgendamentoCliente(cpfCliente, idPet){
    let query =`
        SELECT
            a.*,
            a.data_hora,
            p.nome AS nome_pet,
            f.nome AS nome_funcionario,
            s.nome_servico
        FROM agendamentos a
        JOIN pets p ON a.id_pet = p.id_pet
        JOIN funcionarios f ON a.id_profissional = f.id_profissional
        JOIN servicos s ON a.id_servico = s.id_servico
        WHERE p.cpf_cliente  = ?
    `

    const params = [cpfCliente];

    if (idPet) {
        query += ' AND p.id_pet = ?'; 
        params.push(idPet);
    }

    query += ' ORDER BY a.data_hora ASC';

    const [rows] = await pool.query(query, params);
    return rows;

}

async function listarAgendamentos(data, idProfissional, servico) {
    let query = `
        SELECT 
            a.*, 
            p.nome AS nome_pet, 
            f.nome AS nome_profissional, 
            s.nome_servico 
        FROM agendamentos a
        JOIN pets p ON a.id_pet = p.id_pet
        JOIN funcionarios f ON a.id_profissional = f.id_profissional
        JOIN servicos s ON a.id_servico = s.id_servico
        WHERE 1=1
    `;
    
    const params = [];

    if (data) {
        query += ' AND DATE(a.data_hora) = DATE(?)'; 
        params.push(data);
    }

    if (idProfissional) {
        query += ' AND a.id_profissional = ?';
        params.push(idProfissional);
    }

    if (servico) {
        query += ' AND s.id_servico = ?';
        params.push(servico);
    }

    query += ' ORDER BY a.data_hora ASC';

    const [rows] = await pool.query(query, params);
    return rows;
}

async function atualizarAgendamento(idAgendamento, dados){
    let campos = [];
    let valores = [];

    for(let campo in dados){
      if (dados[campo] !== undefined && dados[campo] !== null){
        campos.push(`${campo} = ?`);
        valores.push(dados[campo]);
      }
    }

    if (campos.length === 0) return false;
    valores.push(idAgendamento);

    const query = `
    UPDATE agendamentos
    SET ${campos.join(', ')}
    WHERE id_agendamento = ?
    `;

    const [result] = await pool.query(query, valores);
    return result.affectedRows > 0;
}

async function buscarAgendamentoPorId(idAgendamento) {
  const [rows] = await pool.query(
    'SELECT * FROM agendamentos WHERE id_agendamento = ?',
    [idAgendamento]
  );
  return rows[0];
}

async function cancelarAgendamento(idAgendamento) {
  const query = `
    UPDATE agendamentos
    SET status = 'cancelado'
    WHERE id_agendamento = ?
  `;

  const [result] = await pool.query(query, [idAgendamento]);
  return result.affectedRows > 0;
}

async function verificarHorarioDisponivel(data_hora){
    const [rows] = await pool.query(
        'SELECT * FROM agendamentos WHERE data_hora = ?',
        [data_hora]
    );
    return rows[0];
}

async function verificarProfissionalDisponivel(id_profissional, data_hora) {
  const [rows] = await pool.query(
    `SELECT 
        a.id_agendamento,
        a.data_hora,
        a.id_servico,
        p.id_profissional,
        p.nome AS nome_profissional
     FROM agendamentos a
     JOIN funcionarios p ON a.id_profissional = p.id_profissional
     WHERE a.id_profissional = ? AND a.data_hora = ?`,
    [id_profissional, data_hora]
  );
  return rows[0];
}

module.exports = { 
    criarAgendamento, 
    listarAgendamentoCliente, 
    listarAgendamentos,
    atualizarAgendamento,
    buscarAgendamentoPorId,
    cancelarAgendamento,
    verificarHorarioDisponivel,
    verificarProfissionalDisponivel
};