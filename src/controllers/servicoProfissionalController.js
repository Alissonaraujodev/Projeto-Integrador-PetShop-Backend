const servicoProfissionalModel = require('../models/servicoProfissionalModel');

async function servicoProfissional(req, res) {
    const id_profissional_logado = req.session.userId;

    const { id_profissional, id_servico } = req.body;

    if (!id_profissional_logado) {
        return res.status(401).json({ mensagem: 'Acesso negado. Funcionário não autenticado.' });
    }

    try {
        await servicoProfissionalModel.servicoProfissional(id_profissional, id_servico );
        res.status(201).json({ message: 'Cadastro de serviço/profissional realizada com sucesso!' });
    } catch (error) {
        console.error('Erro ao fazer cadastro de serviço/profissional:', error);
        res.status(500).json({ message: 'Erro interno ao fazer cadastro de serviço/profissional.' });
    }
}

module.exports = { servicoProfissional }