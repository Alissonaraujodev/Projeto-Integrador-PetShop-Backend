const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentosController');

router.post('/agendamento/criar', agendamentoController.criarAgendamento);
router.get('/agendamentos', agendamentoController.listarAgendamentos);
router.get('/agendamentos/historico', agendamentoController.listarAgendamentoCliente);

module.exports = router;