const { pool } = require("../config/db");

async function encontrarClientePorEmail(email) {
  const [rows] = await pool.query(
    'SELECT * FROM clientes WHERE email = ?',
    [email]
  );
  return rows[0];
}

async function encontrarFuncionarioPorEmail(email) {
  const [rows] = await pool.query(
    'SELECT * FROM funcionarios WHERE email = ?',
    [email]
  );
  return rows[0];
}

module.exports = {
  encontrarClientePorEmail,
  encontrarFuncionarioPorEmail
}
