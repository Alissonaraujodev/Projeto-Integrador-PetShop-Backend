const jwt = require("jsonwebtoken");

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
};