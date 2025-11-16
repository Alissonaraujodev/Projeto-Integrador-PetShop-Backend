const agendamentoService = require('../service/agendamentosService');

async function verificarHorario(req, res) {
  const { data_hora } = req.query;

  if (!data_hora) {
    return res.status(400).json({ message: 'O parâmetro data_hora é obrigatório.' });
  }

  try {
    const disponivel = await agendamentoService.verificarHorarioDisponivel(data_hora);
    if (!disponivel) {
      return res.status(200).json({ disponivel: false, message: 'Horário indisponível.' });
    }

    res.status(200).json({ disponivel: true, message: 'Horário disponível!' });
  } catch (error) {
    console.error('Erro ao verificar horário:', error);
    res.status(500).json({ message: 'Erro interno ao verificar horário.' });
  }
}

async function verificarProfissional(req, res) {
  const { id_profissional, data_hora } = req.query;

  if (!id_profissional || !data_hora) {
    return res.status(400).json({ message: 'Os parâmetros id_profissional e data_hora são obrigatórios.' });
  }

  try {
    const disponivel = await agendamentoService.verificarProfissionalDisponivel(id_profissional, data_hora);
    if (!disponivel) {
      return res.status(200).json({ disponivel: false, message: 'Profissional indisponível.' });
    }

    res.status(200).json({ disponivel: true, message: 'Profissional disponível!' });
  } catch (error) {
    console.error('Erro ao verificar profissional:', error);
    res.status(500).json({ message: 'Erro interno ao verificar profissional.' });
  }
}

module.exports = { 
    verificarHorario, 
    verificarProfissional
};