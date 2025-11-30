const petModel = require('../models/petsModel');

async function cadastrarPet(req, res) {
    const cpfCliente = req.user.cpf;
 
    /*if (!cpfCliente) {
        return res.status(401).json({ message: 'Acesso negado. Cliente não autenticado.' });
    }*/

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

    if (!id_profissional_logado) {
        return res.status(401).json({ mensagem: 'Acesso negado. Funcionário não autenticado.' });
    }

    try {
        const todosPets = await petModel.listarTodosPets();
        res.status(200).json(todosPets);

    } catch (error) {
        console.error('Erro ao encontar Pets:', error);
        res.status(500).json({ message: 'Erro interno ao listar pets.' });
    }
    
}

async function atualizarPetCliente(req, res) {
    const cpfCliente = req.session.userId;
    const { id_pet } = req.params; 
    const{ nome } = req.body;
    
    if (!cpfCliente) {
        return res.status(401).json({ message: 'Acesso negado. Cliente não autenticado.' });
    }

    if (!id_pet) {
        return res.status(400).json({ mensagem: 'ID do pet é obrigatório.' });
    }
  
    try{
        const atualizadoSucesso = await petModel.atualizarPet(id_pet, { nome });

        if(atualizadoSucesso){
            res.status(200).json({ mensagem: 'Dados atualizados com sucesso.' });
        }else{
            res.status(404).json({ mensagem: 'Nenhum dado para atualizar.' });
        }  
        }catch(error){
            console.error('Erro ao atualizar Pet:', error);
            res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    } 
}

async function atualizarPetVeterinario(req, res) {
    const id_profissional_logado = req.session.userId;
    const { id_pet } = req.params;
    const{ peso_atual, castrado, observacoes_saude } = req.body;

    if (!id_profissional_logado) {
        return res.status(401).json({ mensagem: 'Acesso negado. Funcionário não autenticado.' });
    }
  
    if (!id_pet) {
        return res.status(400).json({ mensagem: 'ID do pet é obrigatório.' });
    }

    try{
        const atualizadoSucesso = await petModel.atualizarPet(id_pet, {
            peso_atual,
            castrado,
            observacoes_saude
        });

        if(atualizadoSucesso){
            res.status(200).json({ mensagem: 'Dados atualizados com sucesso.' });
        }else{
            res.status(404).json({ mensagem: 'Nenhum dado para atualizar.' });
        }  
        }catch(error){
            console.error('Erro ao atualizar Pet:', error);
            res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    } 
}

module.exports = { 
    cadastrarPet, 
    listarPetsPorCliente, 
    listarTodosPets, 
    atualizarPetCliente,
    atualizarPetVeterinario
};