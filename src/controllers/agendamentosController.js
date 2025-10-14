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
        res.status(500).json({ message: 'Erro interno ao fazer agendamento.' });
    }
}

async function listarAgendamentoCliente(req, res) {
     const cpfCliente = req.session.userId; 

    if (!cpfCliente) {
        return res.status(401).json({ message: 'Acesso negado. Cliente não autenticado.' });
    }

    const { idPet } = req.query;  

    try {
        const historicoAgendamentos = await agendamentoModel.listarAgendamentoCliente(
            cpfCliente,
            idPet       
        );

        res.status(200).json(historicoAgendamentos);

    } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
        res.status(500).json({ message: 'Erro interno ao buscar agendamentos.' });
    }
}

async function listarAgendamentos(req, res) {

    const { data, idProfissional, servico } = req.query;  

    try {
        const agendamentos = await agendamentoModel.listarAgendamentos(
            data, 
            idProfissional, 
            servico 
        );

        res.status(200).json(agendamentos);

    } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
        res.status(500).json({ message: 'Erro interno ao buscar agendamentos.' });
    }
}

module.exports = { criarAgendamento, listarAgendamentos, listarAgendamentoCliente };