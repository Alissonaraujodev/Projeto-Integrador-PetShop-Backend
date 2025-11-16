const express = require('express');
const router = express.Router();
const servicoProfissionalController = require('../controllers/servicoProfissionalController');

const {autorizarAdministrador} = require('../middlewares/authMiddleware');

router.post('/servico-profissional',autorizarAdministrador, servicoProfissionalController.servicoProfissional);

router.get('/profissionais-disponiveis-servico', servicoProfissionalController.listarProfissionalDisponivelPorServico)

module.exports = router;