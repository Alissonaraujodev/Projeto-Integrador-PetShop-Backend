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

module.exports = { criarPet, listarPetsPorCliente };