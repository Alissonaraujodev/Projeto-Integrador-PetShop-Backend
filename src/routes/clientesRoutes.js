const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

router.post('/clientes/cadastro', clientesController.cadastrarCliente);
router.put('/clientes/atualizar', clientesController.atualizarCliente);
router.put('/cliente/alterar-senha', clientesController.alterarSenhaCliente);

module.exports = router;
