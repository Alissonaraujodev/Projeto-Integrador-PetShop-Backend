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
    const cliente = await clienteModel.findByEmail(email);
    if (!cliente) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, cliente.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    req.session.userId = cliente.cpf;

    res.json({ message: 'Login realizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
}

module.exports = { cadastrarCliente, loginCliente };
