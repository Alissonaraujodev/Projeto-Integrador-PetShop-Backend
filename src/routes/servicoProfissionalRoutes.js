const express = require('express');
const router = express.Router();
const servicoProfissionalController = require('../controllers/servicoProfissionalController');
const verificacaoController = require('../controllers/verificacaoController');
const {autorizarAdministrador} = require('../middlewares/authMiddleware');

router.post('/servico-profissional',autorizarAdministrador, servicoProfissionalController.servicoProfissional);

router.get('/profissionais-disponiveis-servico', verificacaoController.verificarProfissionalPorServico)

module.exports = router;