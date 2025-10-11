const { pool } = require('../config/db');

async function criarAgendamento(id_pet, id_servico, id_profissional, data_hora, observacoes) {
    await pool.query(
        'INSERT INTO agendamentos (id_pet, id_servico, id_profissional, data_hora, observacoes) VALUES (?, ?, ?, ?, ?)',
        [id_pet, id_servico, id_profissional, data_hora, observacoes]
    );
}

async function listarAgendamentoPet(id_pet) {
    const [rows] = await pool.query('SELECT * FROM agendamentos WHERE is_pet = ?', [id_pet]);
    return rows;
}

module.exports = { criarAgendamento, listarAgendamentoPet };