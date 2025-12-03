/*const jwt = require("jsonwebtoken");

function gerarTokenCliente(cpf) {
  return jwt.sign(
    { cpf, cargo: "cliente" },
    process.env.JWT_SECRET || "segredo_super_secreto",
    { expiresIn: "1d" }
  );
}

function gerarTokenFuncionario(id, cargo) {
  return jwt.sign(
    { id, cargo },
    process.env.JWT_SECRET || "segredo_super_secreto",
    { expiresIn: "1d" }
  );
}

module.exports = {
    gerarTokenCliente,
    gerarTokenFuncionario
};*/

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
