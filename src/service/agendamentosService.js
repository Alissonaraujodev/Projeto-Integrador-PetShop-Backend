const agendamentoModel = require('../models/agendamentosModel');

async function verificarHorarioDisponivel(data_hora) {
  const agendamento = await agendamentoModel.listarHorarioAgendamentos(data_hora);
  return !agendamento;
}

async function verificarProfissionalDisponivel(id_profissional, data_hora) {
  const agendamento = await agendamentoModel.listarProfissionalEHorarioAgendamentos(id_profissional, data_hora);
  return !agendamento;
}

module.exports = {
  verificarHorarioDisponivel,
  verificarProfissionalDisponivel
};
