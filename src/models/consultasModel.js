const { pool } = require('../config/db');

async function criarConsulta(id_agendamento, diagnostico, medicacao, peso_pet) {
    await pool.query(
        'INSERT INTO consultas (id_agendamento, diagnostico, medicacao, peso_pet) VALUES (?, ?, ?, ?)',
        [id_agendamento, diagnostico, medicacao, peso_pet]
    );
}

async function listarConsultaCliente(cpfCliente, idPet){
    let query = `
        SELECT 
            c.*,
            a.data_hora,
            a.status,
            p.nome AS nome_pet,
            f.nome AS nome_funcionario
        FROM consultas c
        JOIN agendamentos a ON c.id_agendamento = a.id_agendamento
        JOIN pets p ON a.id_pet = p.id_pet
        JOIN funcionarios f ON a.id_profissional = f.id_profissional
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

async function listarConsultas(data, idProfissional) {
    let query = `
        SELECT 
            c.*, 
            a.data_hora,
            a.status,
            p.nome AS nome_pet, 
            f.nome AS nome_profissional
        FROM consultas c
        JOIN agendamentos a ON c.id_agendamento = a.id_agendamento
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

    query += ' ORDER BY a.data_hora ASC';

    const [rows] = await pool.query(query, params);
    return rows;
}

module.exports = { 
    criarConsulta, 
    listarConsultaCliente, 
    listarConsultas 
};