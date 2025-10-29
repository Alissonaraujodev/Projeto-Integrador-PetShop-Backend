const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentosController');
const {autorizarAdministrador, autorizarVeterinario} = require('../middlewares/authMiddleware')

router.post('/agendamento/criar', agendamentoController.criarAgendamento);
router.get('/agendamentos', agendamentoController.listarAgendamentos);
router.get('/agendamentos/historico', agendamentoController.listarAgendamentoCliente);
router.put('/agendamento/atualizar-cliente/:id_agendamento', agendamentoController.atualizarAgendamentoCliente);
router.put('/agendamento/atualizar-veterinario/:id_agendamento',autorizarVeterinario, agendamentoController.atualizarAgendamentoVeterinario);


module.exports = router;