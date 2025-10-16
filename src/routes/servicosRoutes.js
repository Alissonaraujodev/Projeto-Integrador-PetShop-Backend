const express = require('express');
const router = express.Router();
const servicoController = require('../controllers/servicosController');

router.post('/servico/cadastro', servicoController.cadastrarServico);
router.get('/servicos', servicoController.listarServicos);


module.exports = router;