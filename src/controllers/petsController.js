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
        // Pode ser um erro de FK se o CPF na sessão não existir, ou erro de SQL
        res.status(500).json({ message: 'Erro interno ao cadastrar pet.' });
    }
}

module.exports = { cadastrarPet };