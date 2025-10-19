const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

router.post('/clientes/cadastro', clientesController.cadastrarCliente);
router.post('/clientes/login', clientesController.loginCliente);
router.put('/clientes/atualizar', clientesController.atualizarCliente);

module.exports = router;
