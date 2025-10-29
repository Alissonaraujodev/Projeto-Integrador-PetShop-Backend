const { pool } = require('../config/db');

async function criarPet(cpfCliente, nome, especie, raca, pesoAtual, porte, sexo, castrado, dataNascimento, observacoesSaude) {
    await pool.query(
        'INSERT INTO pets (cpf_cliente, nome, especie, raca, peso_atual, porte, sexo, castrado, data_nascimento, observacoes_saude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [cpfCliente, nome, especie, raca, pesoAtual, porte, sexo, castrado, dataNascimento, observacoesSaude]
    );
}

async function listarPetsPorCliente(cpfCliente) {
    const [rows] = await pool.query('SELECT * FROM pets WHERE cpf_cliente = ?', [cpfCliente]);
    return rows;
}

async function listarTodosPets(){
    const [rows] = await pool.query('SELECT * FROM pets');
    return rows;
}
    
async function atualizarPet(idPet, dados){
    let campos = [];
    let valores = [];

    for(let campo in dados){
      if (dados[campo] !== undefined && dados[campo] !== null){
        campos.push(`${campo} = ?`);
        valores.push(dados[campo]);
      }
    }

    if (campos.length === 0) return false;
    valores.push(idPet);

    const query = `
    UPDATE pets
    SET ${campos.join(', ')}
    WHERE id_pet = ?
    `;

    const [result] = await pool.query(query, valores);
    return result.affectedRows > 0;
}


module.exports = { criarPet, listarPetsPorCliente, listarTodosPets, atualizarPet };