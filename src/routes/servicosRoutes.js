const express = require('express');
const router = express.Router();
const servicoController = require('../controllers/servicosController');

router.post('/servico/cadastro', servicoController.cadastrarServico);

module.exports = router;