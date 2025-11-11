const express = require('express');
const router = express.Router();
const verificacaoController = require('../controllers/verificacaoController');

router.get('/verificar-horario', verificacaoController.verificarHorario);
router.get('/verificar-profissional', verificacaoController.verificarProfissional);

module.exports = router;