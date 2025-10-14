const petModel = require('../models/petsModel');

async function cadastrarPet(req, res) {
    const cpfCliente = req.session.userId;
 
    if (!cpfCliente) {
        return res.status(401).json({ message: 'Acesso negado. Cliente não autenticado.' });
    }

    const { nome, especie, raca, peso_atual, porte, sexo, castrado, data_nascimento, observacoes_saude } = req.body;

    try {
        await petModel.criarPet(
            cpfCliente, nome, especie, raca, peso_atual, porte, sexo, castrado, data_nascimento, observacoes_saude
        );

        res.status(201).json({ message: 'Pet cadastrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar Pet:', error);
        res.status(500).json({ message: 'Erro interno ao cadastrar pet.' });
    }
}

async function listarPetsPorCliente(req, res) {
    const cpfCliente = req.session.userId;

    if (!cpfCliente) {
        return res.status(401).json({ message: 'Acesso negado. Cliente não autenticado.' });
    }

    try {
        const petsDoCliente = await petModel.listarPetsPorCliente(cpfCliente);

        res.status(200).json(petsDoCliente);

    } catch (error) {
        console.error('Erro ao encontar Pets:', error);
        res.status(500).json({ message: 'Erro interno ao listar pets.' });
    }
    
}

async function listarTodosPets(req, res) {
    const id_profissional_logado = req.session.userId;

    try {
        const todosPets = await petModel.listarTodosPets();

        res.status(200).json(todosPets);

    } catch (error) {
        console.error('Erro ao encontar Pets:', error);
        res.status(500).json({ message: 'Erro interno ao listar pets.' });
    }
    
}

module.exports = { cadastrarPet, listarPetsPorCliente, listarTodosPets };