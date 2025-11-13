const servicoProfissionalModel = require('../models/servicoProfissionalModel');

async function listarProfissionaisDisponiveisPorServico(id_servico, data_hora) {
  const profissionais = await servicoProfissionalModel.listarProfissionaisDisponiveisPorServico(id_servico, data_hora);
  return profissionais;
}

module.exports = {
    listarProfissionaisDisponiveisPorServico
}