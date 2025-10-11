const bcrypt = require('bcrypt');
const funcionarioModel = require('../models/funcionariosModel');

async function cadastrarFuncionario(req, res) {
  const id_profissional_logado = req.session.userId;
  
  const { nome, email, senha, cargo, crmv } = req.body;

  try {
    const existente = await funcionarioModel.encontrarPorEmail(email);
    if (existente) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    await funcionarioModel.cadastrarFuncionario(nome, email, senhaCriptografada, cargo, crmv);

    res.status(201).json({ message: 'Funcionário cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar funcionário:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
}

async function loginFuncionario(req, res) {
  const { email, senha } = req.body;

  try {
    const funcionario = await funcionarioModel.encontrarPorEmail(email);
    if (!funcionario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, funcionario.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    req.session.userId = funcionario.id;
    req.session.userCargo = funcionario.cargo;

    res.json({ message: 'Login realizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
}

module.exports = { cadastrarFuncionario, loginFuncionario };
