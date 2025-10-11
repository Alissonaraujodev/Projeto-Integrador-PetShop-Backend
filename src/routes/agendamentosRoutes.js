const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentosController');

router.post('/agendamento/criar', agendamentoController.criarAgendamento);

module.exports = router;