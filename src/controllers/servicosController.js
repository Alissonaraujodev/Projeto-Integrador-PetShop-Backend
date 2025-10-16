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

async function listarServicos(req, res) {

    const { nome_servico, categoria } = req.query;  

    try {
        const servicos = await servicoModel.listarServicos(
            nome_servico,
            categoria
        );

        res.status(200).json(servicos);

    } catch (error) {
        console.error('Erro ao buscar Serviços:', error);
        res.status(500).json({ message: 'Erro interno ao buscar Serviços.' });
    }
}



module.exports = { cadastrarServico, listarServicos };
