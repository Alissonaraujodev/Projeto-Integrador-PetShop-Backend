const jwt = require("jsonwebtoken");

function gerarTokenFuncionario(funcionario) {
  const payload = {
    id_profissional: funcionario.id_profissional,
    tipo: "funcionario",
    cargo: funcionario.cargo
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
}

function gerarTokenCliente(cliente) {
  const payload = {
    cpf: cliente.cpf,
    tipo: "cliente"
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
}

module.exports = { gerarTokenFuncionario, gerarTokenCliente };
