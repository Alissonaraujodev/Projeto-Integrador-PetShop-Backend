const servicoModel = require('../models/servicosModel');

async function cadastrarServico(req, res) {
  const id_profissional_logado = req.session.userId;
  const { nome_servico, valor, categoria } = req.body;

  if (!id_profissional_logado) {
    return res.status(401).json({ mensagem: 'Acesso negado. Funcionário não autenticado.' });
  }

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

    const { nome_servico, categoria, valor } = req.query;  

    try {
        const servicos = await servicoModel.listarServicos(
            nome_servico,
            categoria, 
            valor
        );

        res.status(200).json(servicos);

    } catch (error) {
        console.error('Erro ao buscar Serviços:', error);
        res.status(500).json({ message: 'Erro interno ao buscar Serviços.' });
    }
}

async function atualizarServico(req, res) {
  const id_profissional_logado = req.session.userId;
  const { id_servico } = req.params;
  const{ nome_servico, valor, categoria } = req.body;

  if (!id_profissional_logado) {
    return res.status(401).json({ mensagem: 'Acesso negado. Funcionário não autenticado.' });
  }

  if (!id_servico) {
    return res.status(400).json({ mensagem: 'O ID do serviço é obrigatório para atualização.' });
  }

  try{

    const dados = { nome_servico, valor, categoria };
    const atualizadoSucesso = await servicoModel.atualizarServico(id_servico, dados);

    if(atualizadoSucesso){
        res.status(200).json({ mensagem: 'Dados atualizados com sucesso.' });
    }else{
        res.status(404).json({ mensagem: 'Nenhum dado para atualizar.' });
      }  
    }catch(error){
        console.error('Erro ao atualizar serviço:', error);
        res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    } 
}

module.exports = { 
  cadastrarServico, 
  listarServicos, 
  atualizarServico
};
