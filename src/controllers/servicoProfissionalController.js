const servicoProfissionalModel = require('../models/servicoProfissionalModel');
const servicoProfissionalService = require('../service/servicosProfissionalService')

async function servicoProfissional(req, res) {
    const id_profissional_logado = req.user.id_profissional;

    const { id_profissional, id_servico } = req.body;

    if (!id_profissional_logado) {
        return res.status(401).json({ mensagem: 'Acesso negado. Funcionário não autenticado.' });
    }

    try {
        await servicoProfissionalModel.servicoProfissional(id_profissional, id_servico );
        res.status(201).json({ message: 'Cadastro de serviço/profissional realizada com sucesso!' });
    } catch (error) {
        console.error('Erro ao fazer cadastro de serviço/profissional:', error);
        res.status(500).json({ message: 'Erro interno ao fazer cadastro de serviço/profissional.' });
    }
}

async function listarProfissionalDisponivelPorServico(req, res) {
  const { id_servico, data_hora } = req.query;

  if (!id_servico || !data_hora) {
    return res.status(400).json({ message: 'Os parâmetros id_servico e data_hora são obrigatórios.' });
  }

  try {
    const profissionais = await servicoProfissionalService.listarProfissionaisDisponiveisPorServico(id_servico, data_hora);

    if (profissionais.length === 0) {
      return res.status(200).json({ disponiveis: [], message: 'Nenhum profissional disponível para esse serviço e horário.' });
    }

    res.status(200).json({ disponiveis: profissionais });
  } catch (error) {
    console.error('Erro ao listar profissionais disponíveis:', error);
    res.status(500).json({ message: 'Erro interno ao buscar profissionais.' });
  }
}

module.exports = { 
    servicoProfissional,
    listarProfissionalDisponivelPorServico
 }