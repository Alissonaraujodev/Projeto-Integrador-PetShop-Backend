const { pool } = require('../config/db');

async function criarAgendamento(id_pet, id_servico, id_profissional, data_hora, observacoes) {
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

module.exports = { 
    criarAgendamento, 
    listarAgendamentoCliente, 
    listarAgendamentos 
};