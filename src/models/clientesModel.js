const { pool } = require('../config/db');

async function encontrarPorEmail(email) {
  const [rows] = await pool.query('SELECT * FROM clientes WHERE email = ?', [email]);
  return rows[0];
}

async function cadastrarCliente(cpf, nome, email, senhaCriptografada, telefone, logradouro, numero, complemento, bairro, cidade, estado, cep) {
  await pool.query(
    'INSERT INTO clientes (cpf, nome, email, senha, telefone, logradouro, numero, complemento, bairro, cidade, estado, cep) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
     [cpf, nome, email, senhaCriptografada, telefone, logradouro, numero, complemento, bairro, cidade, estado, cep]
  );
}

async function atualizarCliente(cpf, dados){
    let campos = [];
    let valores = [];

    for(let campo in dados){
      if (dados[campo] !== undefined && dados[campo] !== null){
        campos.push(`${campo} = ?`);
        valores.push(dados[campo]);
      }
    }

    if (campos.length === 0) return false;
    valores.push(cpf);

    const query = `
    UPDATE clientes
    SET ${campos.join(', ')}
    WHERE cpf = ?
    `;

    const [result] = await pool.query(query, valores);
    return result.affectedRows > 0;
}


module.exports = { encontrarPorEmail, cadastrarCliente, atualizarCliente };
