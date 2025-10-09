const servicoModel = require('../models/servicosModel');

async function cadastrarServico(req, res) {
  const { nome_servico, valor, categoria } = req.body;

  try {
    const existente = await servicoModel.encontrarPorNome(nome_servico);
    if (existente) {
      return res.status(400).json({ message: 'Serviço já cadastrado' });
    }

    await servicoModel.cadastrarServico(nome_servico, valor, categoria);

    res.status(201).json({ message: 'Servico cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar Servico:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
}

module.exports = { cadastrarServico };
