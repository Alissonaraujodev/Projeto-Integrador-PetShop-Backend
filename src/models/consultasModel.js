const { pool } = require('../config/db');

async function criarConsulta(id_agendamento, diagnostico, medicacao, peso_pet) {
    await pool.query(
        'INSERT INTO consultas (id_agendamento, diagnostico, medicacao, peso_pet) VALUES (?, ?, ?, ?)',
        [id_agendamento, diagnostico, medicacao, peso_pet]
    );
}


module.exports = { criarConsulta };