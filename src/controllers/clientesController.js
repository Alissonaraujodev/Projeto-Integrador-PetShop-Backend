const bcrypt = require('bcrypt');
const clienteModel = require('../models/clientesModel');

async function cadastrarCliente(req, res) {
  const { cpf, nome, email, senha, telefone, logradouro, numero, complemento, bairro, cidade, estado, cep } = req.body;

  
  
  try {
    const existente = await clienteModel.encontrarPorEmail(email);
    if (existente) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    await clienteModel.cadastrarCliente(cpf, nome, email, senhaCriptografada, telefone, logradouro, numero, complemento, bairro, cidade, estado, cep);

    res.status(201).json({ message: 'Cliente cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar Cliente:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
}

async function loginCliente(req, res) {
  const { email, senha } = req.body;

  try {
    const cliente = await clienteModel.encontrarPorEmail(email);
    if (!cliente) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, cliente.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    req.session.userId = cliente.cpf;

    res.json({ 
      message: 'Login realizado com sucesso!',
      tipo: 'cliente',
      nome: cliente.nome
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
}

async function atualizarCliente(req, res) {
  const cpfCliente = req.session.userId; 

  if (!cpfCliente) {
        return res.status(401).json({ message: 'Acesso negado. Cliente não autenticado.' });
    }
  
  const{
    nome, telefone, logradouro, numero, complemento, bairro, cidade, estado, cep
  } = req.body;
  
  try{
    const dadosAtualizados = {
    nome, telefone, logradouro, numero, complemento, bairro, cidade, estado, cep};

    const atualizadoSucesso = await clienteModel.atualizarCliente(cpfCliente, dadosAtualizados);

    if(atualizadoSucesso){
      res.status(200).json({ mensagem: 'Dados atualizados com sucesso.' });
    }else{
      res.status(404).json({ mensagem: 'Nenhum dado para atualizar.' });
    }  
  }catch(error){
    console.error('Erro ao atualizar cliente:', error);
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  } 
}

async function alterarSenhaCliente(req, res) {
  const cpfCliente = req.session.userId; 
  const { senha_atual, nova_senha } = req.body;

  if (!cpfCliente) {
    return res.status(401).json({ mensagem: 'Acesso negado. Cliente não autenticado.' });
  }

  if (!senha_atual || !nova_senha) {
    return res.status(400).json({ mensagem: 'Senha atual e nova senha são obrigatórias.' });
  }

  try {
    const cliente = await clienteModel.buscarClientePorCpf(cpfCliente);
    if (!cliente) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
    }

    const senhaCorreta = await bcrypt.compare(senha_atual, cliente.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: 'Senha atual incorreta.' });
    }

    const novaSenhaHash = await bcrypt.hash(nova_senha, 10);

    const atualizadoSucesso = await clienteModel.atualizarSenhaCliente(cpfCliente, novaSenhaHash);

    if (atualizadoSucesso) {
      res.status(200).json({ mensagem: 'Senha atualizada com sucesso.' });
    } else {
      res.status(500).json({ mensagem: 'Erro ao atualizar a senha.' });
    }

  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
}

module.exports = { 
  cadastrarCliente, 
  loginCliente, 
  atualizarCliente,
  alterarSenhaCliente
};
