const agendamentoModel = require('../models/agendamentosModel');
const agendamentoService = require('../service/agendamentosService')
const servicoProfissionalService = require('../service/servicosProfissionalService')

async function criarAgendamento(req, res) {
    const cpfCliente = req.user.cpf;

    if (!cpfCliente) {
        return res.status(401).json({ message: 'Acesso negado. Cliente não autenticado.' });
    }

    let { id_pet, id_servico, id_profissional, data_hora,  observacoes } = req.body;

    if (!id_pet || !id_servico || !data_hora) {
        return res.status(400).json({ message: 'Campos obrigatórios não preenchidos.' });
    } 

    try {
    
        if (!id_profissional) {
            const profissionaisLivres = await servicoProfissionalService.listarProfissionaisDisponiveisPorServico(id_servico, data_hora);

        if (profissionaisLivres.length === 0) {
            return res.status(400).json({ message: 'Nenhum profissional disponível para esse serviço e horário.' });
        }
            id_profissional = profissionaisLivres[0].id_profissional;
        } else {
            const disponivel = await agendamentoService.verificarProfissionalDisponivel(id_profissional, data_hora);
            if (!disponivel) {
                return res.status(400).json({ message: 'Profissional indisponível nesse horário.' });
            }
        }

        await agendamentoModel.criarAgendamento(id_pet, id_servico, id_profissional, data_hora, observacoes);
        res.status(201).json({ message: 'Agendamento realizado com sucesso!' });

    } catch (error) {
        console.error('Erro ao fazer agendamento:', error);
        res.status(500).json({ message: 'Erro interno ao fazer agendamento.' });
    }
}

async function listarAgendamentoCliente(req, res) {
    const cpfCliente = req.user.cpf; 

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
    const id_profissional_logado = req.user.id_profissional;
    const { data, idProfissional, servico } = req.query;  

    if (!id_profissional_logado) {
        return res.status(401).json({ mensagem: 'Acesso negado. Funcionário não autenticado.' });
    }

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
    const cpfCliente = req.user.cpf;
    const { id_agendamento } = req.params; 
    const{ id_pet, data_hora, id_servico } = req.body;
    
    if (!cpfCliente) {
        return res.status(401).json({ message: 'Acesso negado. Cliente não autenticado.' });
    }

    if (!id_agendamento) {
        return res.status(400).json({ mensagem: 'ID do agendamento é obrigatório.' });
    }
  
    try{
        const agendamento = await agendamentoModel.buscarAgendamentoPorId(id_agendamento);

         if (!agendamento) {
            return res.status(404).json({ mensagem: 'Agendamento não encontrado.' });
        }

        if (agendamento.status === 'Concluído') {
            return res.status(400).json({ mensagem: 'Não é possível alterar um agendamento já concluído.' });
        }

        if (agendamento.status === 'Cancelado') {
            return res.status(400).json({ mensagem: 'Não é possível alterar um agendamento cancelado.' });
        }

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
    const id_profissional_logado = req.user.id_profissional;
    const { id_agendamento } = req.params;
    const{ status } = req.body;

    if (!id_profissional_logado) {
        return res.status(401).json({ mensagem: 'Acesso negado. Funcionário não autenticado.' });
    }
  
    if (!id_agendamento) {
        return res.status(400).json({ mensagem: 'ID do agendamento é obrigatório.' });
    }

    try{
        const agendamento = await agendamentoModel.buscarAgendamentoPorId(id_agendamento);

         if (!agendamento) {
            return res.status(404).json({ mensagem: 'Agendamento não encontrado.' });
        }

        if (agendamento.status === 'Concluído') {
            return res.status(400).json({ mensagem: 'Não é possível alterar um agendamento já concluído.' });
        }

        if (agendamento.status === 'Cancelado') {
            return res.status(400).json({ mensagem: 'Não é possível alterar um agendamento cancelado.' });
        }
        
        const atualizadoSucesso = await agendamentoModel.atualizarAgendamento(id_agendamento, {status});

        if (agendamento.status === 'Concluído') {
            return res.status(400).json({ mensagem: 'Não é possível cancelar um agendamento já concluído.' });
        }

        if (agendamento.status === 'Cancelado') {
            return res.status(400).json({ mensagem: 'Este agendamento já foi cancelado.' });
        }

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

async function cancelarAgendamento(req, res) {
  const id_profissional_logado = req.user.id_profissional;
  const cpfCliente = req.user.cpf;
  const { id_agendamento } = req.params;

  if (!id_profissional_logado && !cpfCliente) {
    return res.status(401).json({ mensagem: 'Acesso negado, Faça login para poder acessar.' });
  }

  if (!id_agendamento) {
    return res.status(400).json({ mensagem: 'O ID do agendamento é obrigatório.' });
  }

  try {
    const agendamento = await agendamentoModel.buscarAgendamentoPorId(id_agendamento);

    if (!agendamento) {
      return res.status(404).json({ mensagem: 'Agendamento não encontrado.' });
    }

    if (agendamento.status === 'Concluído') {
      return res.status(400).json({ mensagem: 'Não é possível cancelar um agendamento já concluído.' });
    }

    if (agendamento.status === 'Cancelado') {
      return res.status(400).json({ mensagem: 'Este agendamento já foi cancelado.' });
    }

    const canceladoSucesso = await agendamentoModel.cancelarAgendamento(id_agendamento);

    if (canceladoSucesso) {
      res.status(200).json({ mensagem: 'Agendamento cancelado com sucesso.' });
    } else {
      res.status(500).json({ mensagem: 'Erro ao cancelar o agendamento.' });
    }

  } catch (error) {
    console.error('Erro ao cancelar agendamento:', error);
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
}

module.exports = { 
    criarAgendamento, 
    listarAgendamentos, 
    listarAgendamentoCliente,
    atualizarAgendamentoCliente,
    atualizarAgendamentoVeterinario,
    cancelarAgendamento
};