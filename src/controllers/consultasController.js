const consultaModel = require('../models/consultasModel');

async function criarConsulta(req, res) {
    const id_profissional_logado = req.session.userId;

    const { id_agendamento, diagnostico, medicacao, peso_pet } = req.body;

    try {
        await consultaModel.criarConsulta(
            id_agendamento, diagnostico, medicacao, peso_pet
        );

        res.status(201).json({ message: 'Consulta realizada com sucesso!' });
    } catch (error) {
        console.error('Erro ao fazer consulta:', error);
        // Pode ser um erro de FK se o CPF na sessão não existir, ou erro de SQL
        res.status(500).json({ message: 'Erro interno ao fazer consulta.' });
    }
}

module.exports = { criarConsulta };