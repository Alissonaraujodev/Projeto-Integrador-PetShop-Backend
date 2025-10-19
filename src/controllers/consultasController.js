const consultaModel = require('../models/consultasModel');

async function criarConsulta(req, res) {
    const id_profissional_logado = req.session.userId;

    const { id_agendamento, diagnostico, medicacao, peso_pet } = req.body;

    try {
        await consultaModel.criarConsulta(
            id_agendamento, diagnostico, medicacao, peso_pet
        );

        res.status(201).json({ message: 'Consulta realizada com sucesso!' });
    } catch (error) {
        console.error('Erro ao fazer consulta:', error);
        res.status(500).json({ message: 'Erro interno ao fazer consulta.' });
    }
}

async function listarConsultaCliente(req, res){
    const cpfCliente = req.session.userId; 
    
        if (!cpfCliente) {
            return res.status(401).json({ message: 'Acesso negado. Cliente não autenticado.' });
        }
    
        const { idPet } = req.query;  
    
        try {
            const historicoConsultas = await consultaModel.listarConsultaCliente(
                cpfCliente,
                idPet       
            );
    
            res.status(200).json(historicoConsultas);
    
        } catch (error) {
            console.error('Erro ao buscar consulta:', error);
            res.status(500).json({ message: 'Erro interno ao buscar consultas.' });
        }
}

async function listarCunsultas(req, res) {
    const id_profissional_logado = req.session.userId;

    const { data, idProfissional } = req.query;  

    try {
        const consultas = await consultaModel.listarConsultas(
            data, 
            idProfissional, 
        );

        res.status(200).json(consultas);

    } catch (error) {
        console.error('Erro ao buscar consulta:', error);
        res.status(500).json({ message: 'Erro interno ao buscar consulta.' });
    }
}

module.exports = { criarConsulta, listarConsultaCliente, listarCunsultas };