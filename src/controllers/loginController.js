const bcrypt = require('bcrypt');
const loginModel = require('../models/loginModel');
const gerarToken = require("../utils/gerarToken");

async function login(req, res) {
  const { email, senha } = req.body;

  try {
    const cliente = await loginModel.encontrarClientePorEmail(email);

    if (cliente) {
      const senhaValida = await bcrypt.compare(senha, cliente.senha);
      if (!senhaValida) {
        return res.status(401).json({ message: "Senha incorreta" });
      }

      // 👉 Token baseado no CPF
      const token = gerarToken.gerarTokenCliente(cliente.cpf);

      return res.json({
        message: "Login de cliente realizado com sucesso!",
        tipo: "cliente",
        token,
        cpf: cliente.cpf,
        nome: cliente.nome
      });
    }

    const funcionario = await loginModel.encontrarFuncionarioPorEmail(email);

    if (funcionario) {
      const senhaValida = await bcrypt.compare(senha, funcionario.senha);
      if (!senhaValida) {
        return res.status(401).json({ message: "Senha incorreta" });
      }

      const token = gerarToken.gerarTokenFuncionario(
        funcionario.id_profissional,
        funcionario.cargo
      );

      return res.json({
        message: "Login de funcionário realizado com sucesso!",
        tipo: "funcionario",
        token,
        id: funcionario.id_profissional,
        cargo: funcionario.cargo,
        nome: funcionario.nome
      });
    }

    return res.status(404).json({ message: "Usuário não encontrado" });

  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
}

module.exports = { login };