const agendamentoModel = require('../models/agendamentosModel');

async function criarAgendamento(req, res) {
    const cpfCliente = req.session.userId;
 
    if (!cpfCliente) {
        return res.status(401).json({ message: 'Acesso negado. Cliente não autenticado.' });
    }

    const { id_pet, id_servico, id_profissional, data_hora,  observacoes } = req.body;

    try {
        await agendamentoModel.criarAgendamento(
            id_pet, id_servico, id_profissional, data_hora, observacoes
        );

        res.status(201).json({ message: 'Agendamento realizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao fazer agendamento:', error);
        // Pode ser um erro de FK se o CPF na sessão não existir, ou erro de SQL
        res.status(500).json({ message: 'Erro interno ao fazer agendamento.' });
    }
}

module.exports = { criarAgendamento };