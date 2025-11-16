const agendamentoModel = require('../models/agendamentosModel');

async function verificarHorarioDisponivel(data_hora) {
  const agendamento = await agendamentoModel.verificarHorarioDisponivel(data_hora);
  return !agendamento;
}

async function verificarProfissionalDisponivel(id_profissional, data_hora) {
  const agendamento = await agendamentoModel.verificarProfissionalDisponivel(id_profissional, data_hora);
  return !agendamento;
}

module.exports = {
  verificarHorarioDisponivel,
  verificarProfissionalDisponivel
};
