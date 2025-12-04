const express = require('express');
const router = express.Router();
const servicoController = require('../controllers/servicosController');
const {autorizarAdministrador, autenticarToken} = require('../middlewares/authMiddleware')

router.post('/servico/cadastro',autenticarToken ,autorizarAdministrador, servicoController.cadastrarServico);
router.get('/servicos', servicoController.listarServicos);
router.put('/servicos/atualizar/:id_servico',autorizarAdministrador, servicoController.atualizarServico )

module.exports = router;