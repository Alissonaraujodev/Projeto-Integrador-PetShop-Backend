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

async function atualizarAgendamentoCliente(req, res) {
    const cpfCliente = req.session.userId;
    const { id_agendamento } = req.params; 
    const{ id_pet, data_hora, id_servico } = req.body;
    
    if (!cpfCliente) {
        return res.status(401).json({ message: 'Acesso negado. Cliente não autenticado.' });
    }

    if (!id_agendamento) {
        return res.status(400).json({ mensagem: 'ID do agendamento é obrigatório.' });
    }
  
    try{
        const atualizadoSucesso = await agendamentoModel.atualizarAgendamento(id_agendamento, { id_pet, data_hora, id_servico });

        if(atualizadoSucesso){
            res.status(200).json({ mensagem: 'Dados atualizados com sucesso.' });
        }else{
            res.status(404).json({ mensagem: 'Nenhum dado para atualizar.' });
        }  
        }catch(error){
            console.error('Erro ao atualizar Agendamento:', error);
            res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    } 
}

async function atualizarAgendamentoVeterinario(req, res) {
    const id_profissional_logado = req.session.userId;
    const { id_agendamento } = req.params;
    const{ status } = req.body;
  
    if (!id_agendamento) {
        return res.status(400).json({ mensagem: 'ID do agendamento é obrigatório.' });
    }

    try{
        const atualizadoSucesso = await agendamentoModel.atualizarAgendamento(id_agendamento, {status});

        if(atualizadoSucesso){
            res.status(200).json({ mensagem: 'Dados atualizados com sucesso.' });
        }else{
            res.status(404).json({ mensagem: 'Nenhum dado para atualizar.' });
        }  
        }catch(error){
            console.error('Erro ao atualizar Agendamento:', error);
            res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    } 
}

module.exports = { 
    criarAgendamento, 
    listarAgendamentos, 
    listarAgendamentoCliente,
    atualizarAgendamentoCliente,
    atualizarAgendamentoVeterinario
};