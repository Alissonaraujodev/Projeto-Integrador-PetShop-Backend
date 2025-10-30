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

    req.session.userId = funcionario.id_profissional;
    req.session.userCargo = funcionario.cargo;

    res.json({ 
      message: 'Login realizado com sucesso!',
      tipo: 'funcionario',
      nome: funcionario.nome,
      cargo: funcionario.cargo
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
}

async function atualizarFuncionario(req, res) {
    const id_profissional_logado = req.session.userId;
    const { id_profissional } = req.params;
    const{ nome, email, cargo } = req.body;
  
    if (!id_profissional) {
        return res.status(400).json({ mensagem: 'ID do profissional é obrigatório.' });
    }

    try{
        const atualizadoSucesso = await funcionarioModel.atualizarFuncionario(id_profissional, {nome, email, cargo});

        if(atualizadoSucesso){
            res.status(200).json({ mensagem: 'Dados atualizados com sucesso.' });
        }else{
            res.status(404).json({ mensagem: 'Nenhum dado para atualizar.' });
        }  
        }catch(error){
            console.error('Erro ao atualizar dados do Funcionario:', error);
            res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    } 
}

async function alterarSenhaFuncionario(req, res) {
  const id_profissional_logado = req.session.userId;
  const { senha_atual, nova_senha } = req.body;

  if (!id_profissional_logado) {
    return res.status(401).json({ mensagem: 'Acesso negado. Funcionário não autenticado.' });
  }

  if (!senha_atual || !nova_senha) {
    return res.status(400).json({ mensagem: 'Senha atual e nova senha são obrigatórias.' });
  }

  try {
    const funcionario = await funcionarioModel.buscarFuncionarioPorId(id_profissional_logado);
    if (!funcionario) {
      return res.status(404).json({ mensagem: 'Funcionário não encontrado.' });
    }

    const senhaCorreta = await bcrypt.compare(senha_atual, funcionario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: 'Senha atual incorreta.' });
    }

    const novaSenhaHash = await bcrypt.hash(nova_senha, 10);

    const atualizadoSucesso = await funcionarioModel.atualizarSenhaFuncionario(id_profissional_logado, novaSenhaHash);

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
  cadastrarFuncionario, 
  loginFuncionario, 
  atualizarFuncionario,
  alterarSenhaFuncionario
};
