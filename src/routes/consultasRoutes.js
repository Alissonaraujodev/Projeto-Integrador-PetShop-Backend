const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultasController');
const { autorizarVeterinario } = require('../middlewares/authMiddleware');

router.post('/consulta/criar', autorizarVeterinario, consultaController.criarConsulta);
router.get('/consulta/historico', consultaController.listarConsultaCliente);
router.get('/consulta', autorizarVeterinario, consultaController.listarCunsultas);

module.exports = router;